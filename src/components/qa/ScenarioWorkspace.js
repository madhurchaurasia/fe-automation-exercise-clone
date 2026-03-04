import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

class ScenarioErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <div className="qa-error-boundary" data-testid="qa-runtime-error">
          <strong>Runtime error captured.</strong>
          <div>{this.state.message}</div>
        </div>
      );
    }

    return this.props.children;
  }
}

const clampDuration = (value, min, max) => {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
};

const TestTimeoutScenario = ({ durationMs, autoStart, setStatus }) => {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setStatus('idle');
  }, [setStatus]);

  useEffect(() => {
    if (!autoStart) return;
    setStarted(true);
    setCompleted(false);
  }, [autoStart]);

  useEffect(() => {
    if (!started) return;
    setStatus('running');
    const timer = setTimeout(() => {
      setCompleted(true);
      setStatus('complete');
    }, durationMs);
    return () => clearTimeout(timer);
  }, [started, durationMs, setStatus]);

  const handleStart = () => {
    setStarted(true);
    setCompleted(false);
  };

  return (
    <div className="scenario-block">
      <button type="button" className="scenario-primary-btn" onClick={handleStart} data-testid="scenario-start">
        Start Long Task
      </button>
      <div className="scenario-target" data-testid="scenario-target">
        {started ? (
          completed ? (
            <span>Completed after {durationMs}ms.</span>
          ) : (
            <span>Loading... (duration {durationMs}ms)</span>
          )
        ) : (
          <span>Idle. Click Start to begin.</span>
        )}
      </div>
    </div>
  );
};

const AssertTimeoutScenario = ({ mode, durationMs, setStatus }) => {
  const [label, setLabel] = useState('PENDING');

  useEffect(() => {
    setLabel('PENDING');
    setStatus('waiting');

    if (mode === 'slow-success') {
      const timer = setTimeout(() => {
        setLabel('READY');
        setStatus('ready');
      }, durationMs);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [mode, durationMs, setStatus]);

  return (
    <div className="scenario-block">
      <div className="scenario-target" data-testid="scenario-target">
        Status Label: <strong>{label}</strong>
      </div>
      <div className="scenario-hint">Expected: READY</div>
    </div>
  );
};

const ActionTimeoutScenario = ({ mode, setStatus }) => {
  const isDisabled = mode === 'disabled-forever' || mode === 'waiting-on-fake-prerequisite';

  useEffect(() => {
    if (mode === 'blocked-overlay') setStatus('blocked');
    if (mode === 'waiting-on-fake-prerequisite') setStatus('waiting');
    if (mode === 'disabled-forever') setStatus('disabled');
  }, [mode, setStatus]);

  return (
    <div className="scenario-block">
      <div className="qa-target-wrapper">
        <button type="button" className="qa-target-btn" data-testid="scenario-target" disabled={isDisabled}>
          Action Target
        </button>
        {mode === 'blocked-overlay' && (
          <div className="qa-overlay" data-testid="scenario-blocker">
            Blocking overlay
          </div>
        )}
      </div>
      {mode === 'waiting-on-fake-prerequisite' && (
        <div className="scenario-hint">Prerequisite: external approval (never resolves).</div>
      )}
    </div>
  );
};

const ElementNotVisibleScenario = ({ mode, setStatus }) => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (mode === 'hidden-tab') {
      setStatus(activeTab === 'details' ? 'visible' : 'hidden');
    } else {
      setStatus('hidden');
    }
  }, [mode, activeTab, setStatus]);

  const target = (
    <div className="qa-hidden-target" data-testid="scenario-target">
      Hidden Target
    </div>
  );

  return (
    <div className="scenario-block">
      {mode === 'display-none' && <div style={{ display: 'none' }}>{target}</div>}
      {mode === 'collapsed' && <div className="qa-collapsed">{target}</div>}
      {mode === 'hidden-tab' && (
        <div className="qa-tabs">
          <div className="qa-tab-controls">
            <button type="button" onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>
              Overview
            </button>
            <button type="button" onClick={() => setActiveTab('details')} className={activeTab === 'details' ? 'active' : ''}>
              Details
            </button>
          </div>
          <div className="qa-tab-panel">
            {activeTab === 'overview' && <div>Overview content.</div>}
            {activeTab === 'details' && target}
          </div>
        </div>
      )}
    </div>
  );
};

const ElementNotStableScenario = ({ mode, durationMs, setStatus }) => {
  const [moving, setMoving] = useState(true);

  useEffect(() => {
    setMoving(true);
    setStatus('moving');
    if (mode === 'stops-after') {
      const timer = setTimeout(() => {
        setMoving(false);
        setStatus('stable');
      }, durationMs);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [mode, durationMs, setStatus]);

  const animationDuration = clampDuration(durationMs, 1000, 60000);

  return (
    <div className="scenario-block">
      <div
        className={`qa-moving-target ${moving ? 'is-moving' : 'is-stable'}`}
        style={{ animationDuration: `${animationDuration}ms` }}
        data-testid="scenario-target"
      >
        Moving Target
      </div>
      <div className="scenario-hint">Animation duration: {animationDuration}ms</div>
    </div>
  );
};

const ElementObscuredScenario = ({ mode, setStatus }) => {
  useEffect(() => {
    setStatus('obscured');
  }, [setStatus]);

  return (
    <div className="scenario-block">
      <div className="qa-target-wrapper">
        <button type="button" className="qa-target-btn" data-testid="scenario-target">
          Covered Target
        </button>
        {mode === 'full-overlay' && <div className="qa-overlay" data-testid="scenario-blocker">Overlay</div>}
        {mode === 'toast-overlap' && <div className="qa-toast" data-testid="scenario-blocker">Toast Overlap</div>}
        {mode === 'banner-overlap' && <div className="qa-banner" data-testid="scenario-blocker">Banner Overlap</div>}
      </div>
    </div>
  );
};

const ElementDisabledScenario = ({ mode, durationMs, setStatus }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(false);
    if (mode === 'never-enable') {
      setStatus('disabled');
      return undefined;
    }

    setStatus('disabled');
    const timer = setTimeout(() => {
      setEnabled(true);
      setStatus('enabled');
    }, durationMs);
    return () => clearTimeout(timer);
  }, [mode, durationMs, setStatus]);

  return (
    <div className="scenario-block">
      <button type="button" className="qa-target-btn" disabled={!enabled} data-testid="scenario-target">
        Confirm Action
      </button>
      <div className="scenario-hint">
        {enabled ? 'Enabled after delay.' : 'Disabled until condition is met.'}
      </div>
    </div>
  );
};

const LocatorNotFoundScenario = ({ mode, durationMs, setStatus }) => {
  const [mounted, setMounted] = useState(false);
  const [filterValue, setFilterValue] = useState('hidden');

  useEffect(() => {
    setMounted(false);
    if (mode === 'delayed-mount') {
      setStatus('waiting');
      const timer = setTimeout(() => {
        setMounted(true);
        setStatus('mounted');
      }, durationMs);
      return () => clearTimeout(timer);
    }

    setStatus('not-found');
    return undefined;
  }, [mode, durationMs, setStatus]);

  const shouldShowFilteredTarget = mode === 'filtered-away' && filterValue.trim() === '';

  return (
    <div className="scenario-block">
      {mode === 'filtered-away' && (
        <div className="qa-filter-box">
          <label htmlFor="qa-filter">Filter items</label>
          <input
            id="qa-filter"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="Type to filter"
          />
        </div>
      )}
      {(mode === 'not-mounted' || mode === 'filtered-away') && !shouldShowFilteredTarget && (
        <div className="scenario-hint">Target never renders in this mode.</div>
      )}
      {mode === 'delayed-mount' && mounted && (
        <div className="qa-target-box" data-testid="scenario-target">
          Mounted Target
        </div>
      )}
      {mode === 'filtered-away' && shouldShowFilteredTarget && (
        <div className="qa-target-box" data-testid="scenario-target">
          Filtered Target
        </div>
      )}
    </div>
  );
};

const LocatorMultipleMatchesScenario = ({ mode, setStatus }) => {
  useEffect(() => {
    setStatus('duplicate');
  }, [setStatus]);

  return (
    <div className="scenario-block">
      {mode === 'duplicate-buttons' && (
        <div className="qa-dup-group">
          <button type="button">Submit</button>
          <button type="button">Submit</button>
        </div>
      )}
      {mode === 'duplicate-links' && (
        <div className="qa-dup-group">
          <a href="#duplicate">Learn more</a>
          <a href="#duplicate">Learn more</a>
        </div>
      )}
      {mode === 'duplicate-inputs' && (
        <div className="qa-dup-group">
          <label htmlFor="dup-email-1">Email</label>
          <input id="dup-email-1" type="email" />
          <label htmlFor="dup-email-2">Email</label>
          <input id="dup-email-2" type="email" />
        </div>
      )}
      <div className="scenario-target" data-testid="scenario-target">
        Duplicate controls rendered.
      </div>
    </div>
  );
};

const StaleDomReferenceScenario = ({ mode, durationMs, setStatus }) => {
  const [version, setVersion] = useState(1);

  useEffect(() => {
    if (mode === 'auto-remount') {
      setStatus('stable');
      const timer = setTimeout(() => {
        setVersion((prev) => prev + 1);
        setStatus('replaced');
      }, durationMs);
      return () => clearTimeout(timer);
    }

    setStatus('stable');
    return undefined;
  }, [mode, durationMs, setStatus]);

  const handleRefresh = () => {
    setVersion((prev) => prev + 1);
    setStatus('replaced');
  };

  return (
    <div className="scenario-block">
      <button type="button" className="scenario-primary-btn" onClick={handleRefresh}>
        Refresh Target
      </button>
      <div key={version} className="qa-target-box" data-testid="scenario-target">
        Target instance v{version}
      </div>
    </div>
  );
};

const NavigationTimeoutScenario = ({ mode, durationMs, setStatus }) => {
  const [view, setView] = useState('idle');
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const startNavigation = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setView('loading');
    setStatus('loading');

    if (mode === 'delayed-content') {
      timerRef.current = setTimeout(() => {
        setView('content');
        setStatus('ready');
      }, durationMs);
    }

    if (mode === 'unresolved-content-pane') {
      setView('shell');
    }
  };

  return (
    <div className="scenario-block">
      <button type="button" className="scenario-primary-btn" onClick={startNavigation}>
        Go to Reports
      </button>
      <div className="qa-nav-shell" data-testid="scenario-target">
        {view === 'idle' && <div>Idle shell.</div>}
        {view === 'loading' && <div>Loading shell...</div>}
        {view === 'content' && <div>Reports content loaded.</div>}
        {view === 'shell' && (
          <div>
            <div className="qa-shell-header">Reports</div>
            <div className="qa-shell-content">Content pane is still loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

const NetworkRequestFailedScenario = ({ mode, durationMs, autoStart, setStatus }) => {
  const [requestState, setRequestState] = useState('idle');
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const runRequest = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRequestState('pending');
    setStatus('pending');

    if (mode === 'success') {
      timerRef.current = setTimeout(() => {
        setRequestState('success');
        setStatus('success');
      }, 800);
      return;
    }

    if (mode === 'timeout') {
      timerRef.current = setTimeout(() => {
        setRequestState('timeout');
        setStatus('timeout');
      }, durationMs);
      return;
    }

    if (mode === 'aborted') {
      timerRef.current = setTimeout(() => {
        setRequestState('aborted');
        setStatus('aborted');
      }, 600);
      return;
    }

    if (mode === 'network-failure') {
      timerRef.current = setTimeout(() => {
        setRequestState('error');
        setStatus('error');
      }, 300);
    }
  }, [mode, durationMs, setStatus]);

  useEffect(() => {
    if (autoStart) {
      runRequest();
    }
  }, [autoStart, runRequest]);

  return (
    <div className="scenario-block">
      <button type="button" className="scenario-primary-btn" onClick={runRequest}>
        Send Fake Request
      </button>
      <div className="qa-target-box" data-testid="scenario-target">
        Request state: {requestState}
      </div>
    </div>
  );
};

const PageClosedScenario = ({ mode, durationMs, setStatus }) => {
  const [windowState, setWindowState] = useState('idle');
  const [regionVisible, setRegionVisible] = useState(true);
  const timerRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (popupRef.current && !popupRef.current.closed) {
        popupRef.current.close();
      }
    };
  }, []);

  const trigger = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (mode === 'auto-close-window') {
      const popup = window.open('', 'qa_popup', 'width=320,height=240');
      if (!popup) {
        setWindowState('blocked');
        setStatus('blocked');
        return;
      }

      popupRef.current = popup;
      popup.document.write('<p>QA popup opened.</p>');
      setWindowState('opened');
      setStatus('opened');
      timerRef.current = setTimeout(() => {
        popup.close();
        setWindowState('closed');
        setStatus('closed');
      }, durationMs);
      return;
    }

    setRegionVisible(true);
    setWindowState('visible');
    setStatus('visible');
    timerRef.current = setTimeout(() => {
      setRegionVisible(false);
      setWindowState('closed');
      setStatus('closed');
    }, durationMs);
  };

  return (
    <div className="scenario-block">
      <button type="button" className="scenario-primary-btn" onClick={trigger}>
        Trigger Page Close
      </button>
      {mode === 'auto-close-window' && (
        <div className="qa-target-box" data-testid="scenario-target">
          Popup state: {windowState}
        </div>
      )}
      {mode === 'vanishing-region' && regionVisible && (
        <div className="qa-target-box" data-testid="scenario-target">
          Vanishing region visible
        </div>
      )}
      {mode === 'vanishing-region' && !regionVisible && (
        <div className="scenario-hint">Region closed.</div>
      )}
    </div>
  );
};

const AppRuntimeErrorScenario = ({ mode, durationMs, setStatus }) => {
  const [shouldThrow, setShouldThrow] = useState(false);

  useEffect(() => {
    setShouldThrow(false);
    if (mode === 'throw-on-mount') {
      setStatus('armed');
      const timer = setTimeout(() => {
        setStatus('error-triggered');
        setShouldThrow(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    if (mode === 'throw-on-async') {
      setStatus('armed');
      const timer = setTimeout(() => {
        setStatus('error-triggered');
        setShouldThrow(true);
      }, durationMs);
      return () => clearTimeout(timer);
    }

    setStatus('idle');
    return undefined;
  }, [mode, durationMs, setStatus]);

  const handleClick = () => {
    setStatus('error-triggered');
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('Simulated runtime error');
  }

  return (
    <div className="scenario-block">
      {mode === 'throw-on-click' && (
        <button type="button" className="scenario-primary-btn" onClick={handleClick}>
          Trigger Runtime Error
        </button>
      )}
      <div className="qa-target-box" data-testid="scenario-target">
        Error mode: {mode}
      </div>
    </div>
  );
};

const ScenarioWorkspace = ({
  scenario,
  mode,
  onModeChange,
  durationMs,
  onDurationChange,
  autoStart,
  onAutoStartChange,
  onReset,
  resetToken
}) => {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('idle');
  }, [scenario.code, mode, resetToken]);

  const durationValue = useMemo(() => {
    return clampDuration(Number(durationMs), 500, 60000);
  }, [durationMs]);

  const ScenarioRenderer = () => {
    const props = { mode, durationMs: durationValue, autoStart, setStatus };

    switch (scenario.code) {
      case 'TEST_TIMEOUT':
        return <TestTimeoutScenario {...props} />;
      case 'ASSERT_TIMEOUT':
        return <AssertTimeoutScenario {...props} />;
      case 'ACTION_TIMEOUT':
        return <ActionTimeoutScenario {...props} />;
      case 'ELEMENT_NOT_VISIBLE':
        return <ElementNotVisibleScenario {...props} />;
      case 'ELEMENT_NOT_STABLE':
        return <ElementNotStableScenario {...props} />;
      case 'ELEMENT_OBSCURED':
        return <ElementObscuredScenario {...props} />;
      case 'ELEMENT_DISABLED':
        return <ElementDisabledScenario {...props} />;
      case 'LOCATOR_NOT_FOUND':
        return <LocatorNotFoundScenario {...props} />;
      case 'LOCATOR_MULTIPLE_MATCHES':
        return <LocatorMultipleMatchesScenario {...props} />;
      case 'STALE_DOM_REFERENCE':
        return <StaleDomReferenceScenario {...props} />;
      case 'NAVIGATION_TIMEOUT':
        return <NavigationTimeoutScenario {...props} />;
      case 'NETWORK_REQUEST_FAILED':
        return <NetworkRequestFailedScenario {...props} />;
      case 'PAGE_CLOSED':
        return <PageClosedScenario {...props} />;
      case 'APP_RUNTIME_ERROR':
        return (
          <ScenarioErrorBoundary>
            <AppRuntimeErrorScenario {...props} />
          </ScenarioErrorBoundary>
        );
      default:
        return <div className="scenario-block">No scenario selected.</div>;
    }
  };
  const scenarioKey = `${scenario.code}-${mode}-${resetToken}`;

  return (
    <div
      className="scenario-workspace"
      data-testid="active-scenario"
      data-scenario-code={scenario.code}
      data-scenario-mode={mode}
    >
      <div className="scenario-header">
        <div>
          <h2>{scenario.title}</h2>
          <div className="scenario-code">{scenario.code}</div>
        </div>
        <div className={`scenario-severity severity-${scenario.severity.toLowerCase()}`}>
          {scenario.severity}
        </div>
      </div>

      <div className="scenario-details">
        <div className="scenario-mode" data-testid="scenario-mode">Mode: {mode}</div>
        <p className="scenario-meaning">{scenario.developerMeaning}</p>
        <div className="scenario-columns">
          <div>
            <h4>Likely Causes</h4>
            <ul>
              {scenario.likelyCauses.map((cause) => (
                <li key={cause}>{cause}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Suggested Fixes</h4>
            <ul>
              {scenario.suggestedFixes.map((fix) => (
                <li key={fix}>{fix}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="scenario-hint">Repro hint: {scenario.reproHint}</div>
      </div>

      <div className="scenario-controls">
        {scenario.supportedModes.length > 1 && (
          <label>
            Mode
            <select value={mode} onChange={(e) => onModeChange(e.target.value)}>
              {scenario.supportedModes.map((scenarioMode) => (
                <option key={scenarioMode} value={scenarioMode}>
                  {scenarioMode}
                </option>
              ))}
            </select>
          </label>
        )}
        {scenario.supportsDuration && (
          <label>
            Duration (ms)
            <input
              type="number"
              min="500"
              max="60000"
              value={durationValue}
              onChange={(e) => onDurationChange(Number(e.target.value))}
            />
          </label>
        )}
        {scenario.supportsAutoStart && (
          <label className="qa-checkbox">
            <input
              type="checkbox"
              checked={autoStart}
              onChange={(e) => onAutoStartChange(e.target.checked)}
            />
            Auto-start
          </label>
        )}
        <button type="button" className="scenario-reset" onClick={onReset} data-testid="scenario-reset">
          Reset Scenario
        </button>
      </div>

      <div className="scenario-status" data-testid="scenario-status" data-scenario-state={status}>
        Status: {status}
      </div>

      <div className="scenario-stage">
        <ScenarioRenderer key={scenarioKey} />
      </div>
    </div>
  );
};

export default ScenarioWorkspace;
