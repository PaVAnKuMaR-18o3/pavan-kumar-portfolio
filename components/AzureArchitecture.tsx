import { azureProject } from "@/lib/data";
import ArchitectureFlow from "./ArchitectureFlow";

export default function AzureArchitecture() {
  return (
    <div className="border-b border-line py-16 md:py-20 bg-surface">
      <div className="container-grid">
        <ArchitectureFlow label="Telemetry pipeline" steps={azureProject.architecture} />
      </div>
    </div>
  );
}
