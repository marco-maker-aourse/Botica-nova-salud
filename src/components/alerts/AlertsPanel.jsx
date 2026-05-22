import { markAlertAsRead } from "../../services/alertService";
import StatusBadge from "../common/StatusBadge";
import Button from "../ui/Button";

function AlertsPanel({ alerts, onRefresh }) {
  return (
    <div className="glass-panel rounded-3xl p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="section-title">Alertas automaticas</h3>
        <StatusBadge tone="warning">{alerts.length} pendientes</StatusBadge>
      </div>
      <div className="space-y-3">
        {alerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{alert.tipo}</p>
                <p className="mt-1 text-sm text-slate-500">{alert.mensaje}</p>
              </div>
              {!alert.leido ? (
                <Button
                  variant="secondary"
                  onClick={async () => {
                    await markAlertAsRead(alert.id);
                    onRefresh();
                  }}
                >
                  Marcar leida
                </Button>
              ) : (
                <StatusBadge tone="success">Leida</StatusBadge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertsPanel;
