import SectionHeading from "./SectionHeading";
import AzureProject from "./AzureProject";
import AzureArchitecture from "./AzureArchitecture";
import AzureEvidence from "./AzureEvidence";
import InvestigationStory from "./InvestigationStory";
import NarrativeConnector from "./NarrativeConnector";
import EventMatrix from "./EventMatrix";
import SystemTransition from "./SystemTransition";
import MiniSiemProject from "./MiniSiemProject";
import SecureCloudProject from "./SecureCloudProject";

export default function SelectedSystems() {
  return (
    <section id="work" className="scroll-mt-16">
      <div id="systems" className="container-grid pt-16 md:pt-20 pb-4 scroll-mt-16">
        <SectionHeading
          eyebrow="From signal to system"
          title="Every event starts as a signal. Here's how each one was investigated, correlated and turned into something built."
        />
      </div>

      <AzureProject />
      <AzureArchitecture />
      <AzureEvidence />
      <InvestigationStory />
      <NarrativeConnector
        from={{ label: "Investigate", accent: "investigate" }}
        to={{ label: "Detect", accent: "investigate" }}
      />
      <EventMatrix />
      <SystemTransition />
      <MiniSiemProject />
      <NarrativeConnector
        from={{ label: "Build", accent: "system" }}
        to={{ label: "Protect", accent: "protect" }}
      />
      <SecureCloudProject />
    </section>
  );
}
