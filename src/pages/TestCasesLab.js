import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ScenarioCatalog from '../components/qa/ScenarioCatalog';
import ScenarioWorkspace from '../components/qa/ScenarioWorkspace';
import { SCENARIOS, getScenarioByCode } from '../components/qa/scenarios/scenarioConfig';
import './TestCasesLab.css';

const clampDuration = (value, fallback) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(Math.max(value, 500), 60000);
};

const parseBoolean = (value) => value === '1' || value === 'true';

const TestCasesLab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultScenario = SCENARIOS[0];

  const [activeCode, setActiveCode] = useState(defaultScenario.code);
  const [mode, setMode] = useState(defaultScenario.defaultMode);
  const [durationMs, setDurationMs] = useState(defaultScenario.defaultDurationMs || 5000);
  const [autoStart, setAutoStart] = useState(false);
  const [resetToken, setResetToken] = useState(0);

  const activeScenario = useMemo(() => {
    return getScenarioByCode(activeCode) || defaultScenario;
  }, [activeCode, defaultScenario]);

  const syncUrlParams = (nextScenario, nextMode, nextDuration, nextAutoStart) => {
    const params = new URLSearchParams();
    params.set('scenario', nextScenario.code);
    params.set('mode', nextMode);
    if (nextScenario.supportsDuration) {
      params.set('duration', String(nextDuration));
    }
    if (nextScenario.supportsAutoStart && nextAutoStart) {
      params.set('autoStart', '1');
    }
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    const scenarioParam = searchParams.get('scenario');
    if (!scenarioParam) return;

    const paramScenario = getScenarioByCode(scenarioParam) || defaultScenario;
    const paramMode = searchParams.get('mode');
    const modeValue = paramScenario.supportedModes.includes(paramMode)
      ? paramMode
      : paramScenario.defaultMode;
    const durationValue = paramScenario.supportsDuration
      ? clampDuration(Number(searchParams.get('duration')), paramScenario.defaultDurationMs || 5000)
      : durationMs;
    const autoStartValue = paramScenario.supportsAutoStart
      ? parseBoolean(searchParams.get('autoStart'))
      : false;

    if (activeCode !== paramScenario.code) setActiveCode(paramScenario.code);
    if (mode !== modeValue) setMode(modeValue);
    if (durationMs !== durationValue) setDurationMs(durationValue);
    if (autoStart !== autoStartValue) setAutoStart(autoStartValue);
  }, [searchParams, activeCode, mode, durationMs, autoStart, defaultScenario]);

  const handleActivate = (code) => {
    const scenario = getScenarioByCode(code) || defaultScenario;
    const nextDuration = scenario.defaultDurationMs || 5000;
    setActiveCode(scenario.code);
    setMode(scenario.defaultMode);
    setDurationMs(nextDuration);
    setAutoStart(false);
    setResetToken((prev) => prev + 1);
    syncUrlParams(scenario, scenario.defaultMode, nextDuration, false);
  };

  const handleModeChange = (nextMode) => {
    if (!activeScenario.supportedModes.includes(nextMode)) return;
    setMode(nextMode);
    setResetToken((prev) => prev + 1);
    syncUrlParams(activeScenario, nextMode, durationMs, autoStart);
  };

  const handleDurationChange = (value) => {
    const nextDuration = clampDuration(Number(value), durationMs);
    setDurationMs(nextDuration);
    syncUrlParams(activeScenario, mode, nextDuration, autoStart);
  };

  const handleAutoStartChange = (value) => {
    setAutoStart(value);
    syncUrlParams(activeScenario, mode, durationMs, value);
  };

  const handleReset = () => {
    setResetToken((prev) => prev + 1);
  };

  return (
    <div className="test-cases-lab">
      <div className="lab-header">
        <h1>QA Failure Lab</h1>
        <p>
          Deterministic scenarios for Playwright reproduction. Use the catalog to activate a
          scenario and the workspace to control modes, duration, and reset behavior.
        </p>
      </div>

      <div className="lab-body">
        <ScenarioCatalog
          scenarios={SCENARIOS}
          activeCode={activeScenario.code}
          onActivate={handleActivate}
        />
        <ScenarioWorkspace
          scenario={activeScenario}
          mode={mode}
          onModeChange={handleModeChange}
          durationMs={durationMs}
          onDurationChange={handleDurationChange}
          autoStart={autoStart}
          onAutoStartChange={handleAutoStartChange}
          onReset={handleReset}
          resetToken={resetToken}
        />
      </div>
    </div>
  );
};

export default TestCasesLab;
