import type { EditorialLandingProps } from "@/components/EditorialLanding";

const tenantImage = "/media/generated/tenant-protection/casapay-tenant-move-in.png";
const operatorImage = "/media/generated/platform-partner-photo/openai-gpt-image-2/audiences/pms-platform.png";
const platformImage = "/media/generated/platform-partner-photo/openai-gpt-image-2/platform-partner-human-life-landscape.png";

export const operatorLanding: EditorialLandingProps = {
  eyebrow: "For rental operators", title: "Grow your rent business with CasaPay.",
  intro: "Create RentLinks, track and reconcile rent, and earn commissions for eligible tenant referrals.", heroImage: operatorImage, heroAlt: "A rental operator and platform professional collaborating in a residential setting", cta: "Sign up",
  sectionEyebrow: "From request to reconciliation", sectionTitle: "A clearer rent workflow.", sectionIntro: "Keep the tenant, unit, amount, due date and payment status connected.",
  cards: [{ title: "Create", body: "Create a tenant-ready RentLink with the rental context attached." }, { title: "Collect", body: "Give tenants a clear payment route and keep status visible." }, { title: "Reconcile", body: "Connect payment evidence and support back to the rent obligation." }],
  storyTitle: "Use CasaPay directly or through your platform.", storyBody: "Start in CasaPay or connect through a PMS, CRM or accounting Platform Partner using RentLink.", storyImage: platformImage, storyAlt: "Platform and rental professionals working together",
  boundaryTitle: "The setup follows the operation.", boundaryBody: "Availability, onboarding, payment methods, protection options and product terms depend on the operator, tenant, home and jurisdiction.",
  faqs: [{ question: "What happens after I request access?", answer: "CasaPay reviews the operating context and follows up about suitable next steps. This demo does not submit the request." }, { question: "Which operators can request access?", answer: "Letting agents, property managers, BTR, PBSA, co-living, serviced-apartment and institutional rental operators can describe their needs." }, { question: "Can we connect through our property platform?", answer: "PMS, CRM and accounting platforms can explore a RentLink Platform Partner path." }],
  formTitle: "Tell us about your rental operation.", formAudience: "operator",
};

export const rentlinkLanding: EditorialLandingProps = {
  eyebrow: "CasaPay RentLink", title: "The payment link built for rent.", intro: "Turn every rent obligation into a tenant-ready, reconciled payment flow—without replacing your PMS.", heroImage: tenantImage, heroAlt: "Tenants moving into a bright home", cta: "Explore RentLink",
  sectionEyebrow: "Simple for tenants. Structured for operators.", sectionTitle: "A payment link collects money. RentLink manages rent.",
  cards: [{ title: "Rental context attached", body: "Connect the tenant, lease or unit, amount and due date." }, { title: "Tenant-ready flow", body: "Give each obligation a clear route to payment." }, { title: "Status that leads somewhere", body: "Keep reconciliation evidence and support context connected." }],
  storyTitle: "Create. Collect. Reconcile.", storyBody: "Create in Operator Portal, feed RentLinks from an existing workflow, or embed the API path directly.", storyImage: operatorImage, storyAlt: "Rental professionals reviewing a workflow together",
  boundaryTitle: "Available paths depend on the setup.", boundaryBody: "Payment methods, integrations, protection, guarantees, payout timing, pricing and jurisdictional availability remain subject to applicable terms.",
  faqs: [{ question: "Is RentLink only a hosted payment page?", answer: "No. It ties the payment flow and status to the underlying rent obligation and rental context." }, { question: "Does it replace our PMS?", answer: "No. RentLink is designed to connect with or sit alongside the workflow an operator already uses." }, { question: "Which payment methods are available?", answer: "Methods and modules depend on the approved setup, market and applicable terms." }],
  formTitle: "Tell us how rent enters your workflow.", formAudience: "rentlink",
};

export const capitalLanding: EditorialLandingProps = {
  eyebrow: "CasaPay Capital", title: "Access financing with clearer rental context.", intro: "A review-led path for eligible rental operators planning around their operation.", heroImage: operatorImage, heroAlt: "Rental professionals discussing plans in a residential community", cta: "Request a review",
  sectionEyebrow: "Before any commitment", sectionTitle: "Financing shaped around the rental operation.",
  cards: [{ title: "Operator-context review", body: "Start with the business need and relevant rental operation." }, { title: "Terms before commitment", body: "Review proposed terms before making a decision." }, { title: "Support business needs", body: "Describe the plan without implying a guaranteed outcome." }],
  storyTitle: "Clear steps before any commitment.", storyBody: "Request a review, consider proposed terms, and only then decide whether to confirm with the applicable funding partner.",
  boundaryTitle: "Capital is subject to review.", boundaryBody: "Eligibility, underwriting, rates, amounts, terms, jurisdiction, funding-partner disclosures and availability apply. Nothing here promises approval or funding.",
  faqs: [{ question: "Who may be eligible?", answer: "Eligibility depends on the operator, need, jurisdiction, underwriting and the applicable funding partner." }, { question: "How much financing is available?", answer: "No amount is promised. Any proposal would follow a completed review." }, { question: "How quickly are funds available?", answer: "No decision or funding timeline is represented by this private demonstration." }],
  formTitle: "What is the operation planning?", formAudience: "capital",
};

export const referralsLanding: EditorialLandingProps = {
  eyebrow: "CasaPay Referrals", title: "Turn your tenant reach into value.", intro: "Introduce tenants through operator-managed channels and earn under agreed programme terms when an eligible activation qualifies.", heroImage: tenantImage, heroAlt: "Tenants sharing a move-in moment", cta: "Explore the programme",
  sectionEyebrow: "Use the moments you already own", sectionTitle: "From introduction to eligible activation.",
  cards: [{ title: "Introduce", body: "Use approved move-in, resident portal, email, SMS or support channels." }, { title: "Tenant activates", body: "The tenant chooses and completes an eligible CasaPay journey." }, { title: "Earn under agreed terms", body: "Qualifying events are defined in the applicable programme agreement." }],
  storyTitle: "A programme that fits the tenant relationship.", storyBody: "Keep the introduction inside the rental conversation rather than creating a disconnected referral funnel.", storyImage: operatorImage, storyAlt: "A rental operator and platform professional collaborating",
  boundaryTitle: "No universal reward is promised here.", boundaryBody: "Programme terms must define participation, qualifying activation, attribution, exclusions, reward value, settlement, geography and availability.",
  faqs: [{ question: "Who can apply?", answer: "Participating rental operators can describe the channels they use to communicate with tenants." }, { question: "What counts as an activation?", answer: "The qualifying event is defined by the applicable programme terms." }, { question: "How much can an operator earn?", answer: "This demonstration does not state a reward amount or settlement schedule." }],
  formTitle: "Tell us how you reach tenants.", formAudience: "referrals",
};

export { tenantImage, operatorImage, platformImage };
