import React from 'react';

const ScenarioCatalog = ({ scenarios, activeCode, onActivate }) => {
  return (
    <div className="scenario-catalog">
      <h2>Scenario Catalog</h2>
      <div className="scenario-list" data-testid="scenario-list">
        {scenarios.map((scenario) => (
          <div
            key={scenario.code}
            className={`scenario-card ${activeCode === scenario.code ? 'active' : ''}`}
            data-testid={`scenario-card-${scenario.code}`}
          >
            <div className="scenario-card-header">
              <div className="scenario-code">{scenario.code}</div>
              <div className={`scenario-severity severity-${scenario.severity.toLowerCase()}`}>
                {scenario.severity}
              </div>
            </div>
            <h3>{scenario.title}</h3>
            <p className="scenario-summary">{scenario.summary}</p>
            <button
              type="button"
              className="scenario-activate-btn"
              onClick={() => onActivate(scenario.code)}
              data-testid={`activate-scenario-${scenario.code}`}
            >
              Activate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenarioCatalog;
