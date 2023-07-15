require("dotenv").config(); ///Top placement

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

//npm i passport passport-local passport-local-mongoose express-session dotenv

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const path = require("path");

app.use("/images", express.static(path.join(__dirname, "images")));

const DB =
  "mongodb+srv://parth:parth123@cluster0.zj1fto2.mongodb.net/ESG?retryWrites=true&w=majority";

//passport documentation

mongoose.connect(DB, {
  useNewUrlParser: true,
  // useCreateIndex:true,
  // useUnifiedTopology: true,
  // useFindAndModify: false
});

const esgSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  geographicLocation: String,
  industry: String,
  annualRevenue: Number,
  avgEmployees: Number,
  newHirings: Number,
  valuesDocumented: String,
  kpisMeasured: String,
  objectivesRisks: String,
  planActualDeviations: String,
  energyConsumption: Number,
  waterConsumption: Number,
  wasteProduction: Number,
  wasteRecycled: Number,
  co2Emissions: Number,
  rawMaterialsReduction: Number,
  co2EmissionsReduction: Number,
  energyCosts: String,
  environmentalAccidents: String,
  energyEfficiency: String,
  resourceUseReduction: String,
  co2EmissionsComparison: String,
  recyclingRate: String,
  employeeWellBeing: String,
  productRecallRate: String,
  workplaceImprovementActivities: String,
  codeOfConduct: String,
  laborRightsViolationResolution: String,
  healthSafetyAssessments: String,
  stakeholderEngagement: String,
  skillUpgradesCareerAdvancement: String,
  supplyChainPartnerActions: String,
  underrepresentedGroupsWorkforce: String,
  unconsciousBiasElimination: String,
  communityContribution: String,
  supplyChainTransparency: String,
  philanthropicActivities: String,
  codeOfEthics: String,
  riskIdentificationAssessment: String,
  riskManagementPractices: String,
  executiveCompensationDisclosure: String,
  diverseCandidatesAppointment: String,
  corruptionEthicsAllegations: String,
  complianceGovernanceTrainings: String,
  whistleblowerHotline: String,
  lobbyingDonations: String,
  rulesRegulationsUpdates: String,
  boardOfDirectorsMeetings: String,
  executiveCompensationSustainability: String,
});

// Create the ESGData model
const esguser = mongoose.model("Euser", esgSchema);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/crossbar", (req, res) => {
  res.render("crossbar");
});

app.get("/what_is_esg", (req, res) => {
  res.render("what_is_esg");
});

app.get("/contact_us", (req, res) => {
  res.render("contact_us");
});

app.get("/calculator", async function (req, res) {
  res.render("calculator");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/calculate_esg", async (req, res) => {
  const {
    company_name,
    geographic_location,
    industry,
    annual_revenue,
    average_employees,
    new_hirings,
    values_documented,
    kpis_measured,
    objectives_risks,
    plan_actual_deviations,

    energy_consumption,
    water_consumption,
    waste_production,
    waste_recycled,
    co2_emissions,
    raw_materials_reduction,
    co2_emissions_reduction,
    energy_costs,
    environmental_accidents,
    site_energy_efficiency,
    resource_use_reduction,
    co2_emissions_comparison,
    recycling_rate,
    employee_wellbeing_satisfaction,
    product_recall_rate,
    workplace_improvement_activities,
    code_of_conduct,
    resolve_labour_violations,
    health_safety_assessments,
    engage_with_stakeholders,
    skill_upgrades_advancement,
    supply_chain_partner_ethics,
    underrepresented_workforce,
    unconscious_bias_mitigation,
    community_contribution,
    supply_chain_transparency,
    philanthropic_spending,
    code_of_ethics,
    potential_risks,
    risk_management_review,
    executive_compensation,
    diverse_board_nominations,
    corruption_allegations,
    board_composition,
    risk_management_committee,
    independent_auditors,
    stakeholder_engagement_governance,
  } = req.body;

  // Define weights for each parameter
  // Weights for E parameter
  const energyConsumption_weight = 0.5;
  const waterConsumption_weight = 0.5;
  const wasteProduction_weight = 0.5;
  const wasteRecycled_weight = 0.5;
  const co2Emissions_weight = 0.5;
  const measuresToReduceRawMaterials_weight = 0.5;
  const measuresToReduceCo2Emissions_weight = 0.5;
  const energyCosts_weight = 0.5;
  const numEnvironmentalAccidents_weight = 0.5;
  const siteEnergyEfficiency_weight = 0.5;
  const reducedResourceUse_weight = 0.5;
  const co2EmissionsMarketComparison_weight = 0.5;
  const recyclingRateComparison_weight = 0.5;

  // Weights for S parameter
  const employeeWellBeingSatisfaction_weight = 0.3;
  const productRecallRate_weight = 0.3;
  const workplaceImprovement_weight = 0.3;
  const humanRightsCode_weight = 0.3;
  const labourRightsRemediation_weight = 0.3;
  const healthSafetyAssessments_weight = 0.3;
  const communityEngagement_weight = 0.3;
  const skillUpgradeApproach_weight = 0.3;
  const supplyChainAction_weight = 0.3;
  const underrepresentedGroups_weight = 0.3;
  const unconsciousBiasAddress_weight = 0.3;
  const annualContributionLocalCommunities_weight = 0.3;
  const supplyChainTransparency_weight = 0.3;
  const philanthropicActivities_weight = 0.3;

  // Weights for G parameter
  const codeOfEthics_weight = 0.2;
  const identifyAssessRisks_weight = 0.2;
  const riskManagementPractices_weight = 0.2;
  const executiveCompensationDisclosure_weight = 0.2;
  const diverseCandidatesBoard_weight = 0.2;
  const allegationsCorruptionUnethicalPractices_weight = 0.2;
  const complianceTrainings_weight = 0.2;
  const whistleblowerHotline_weight = 0.2;
  const lobbyingDonations_weight = 0.2;
  const rulesRegulationsUpdateFrequency_weight = 0.2;
  const boardMeetingsFrequency_weight = 0.2;
  const executiveCompensationSustainability_weight = 0.2;

  // Convert string values to numeric values
  const convertToNumeric = (value) => {
    if (value === "a") {
      return 3;
    } else if (value === "b") {
      return 2;
    } else if (value === "c") {
      return 1;
    } else {
      return 0; // Default value if the input is not 'a', 'b', or 'c'
    }
  };

  // Calculate weighted values for each field
  const energyConsumption_weighted =
    convertToNumeric(energy_consumption) * energyConsumption_weight;
  const waterConsumption_weighted =
    convertToNumeric(water_consumption) * waterConsumption_weight;
  const wasteProduction_weighted =
    convertToNumeric(waste_production) * wasteProduction_weight;
  const wasteRecycled_weighted =
    convertToNumeric(waste_recycled) * wasteRecycled_weight;
  const co2Emissions_weighted =
    convertToNumeric(co2_emissions) * co2Emissions_weight;
  const rawMaterialsReduction_weighted =
    convertToNumeric(raw_materials_reduction) *
    measuresToReduceRawMaterials_weight;
  const co2EmissionsReduction_weighted =
    convertToNumeric(co2_emissions_reduction) *
    measuresToReduceCo2Emissions_weight;
  const energyCosts_weighted =
    convertToNumeric(energy_costs) * energyCosts_weight;
  const environmentalAccidents_weighted =
    convertToNumeric(environmental_accidents) *
    numEnvironmentalAccidents_weight;
  const siteEnergyEfficiency_weighted =
    convertToNumeric(site_energy_efficiency) * siteEnergyEfficiency_weight;
  const reducedResourceUse_weighted =
    convertToNumeric(resource_use_reduction) * reducedResourceUse_weight;
  const co2EmissionsComparison_weighted =
    convertToNumeric(co2_emissions_comparison) *
    co2EmissionsMarketComparison_weight;
  const recyclingRate_weighted =
    convertToNumeric(recycling_rate) * recyclingRateComparison_weight;

  const employeeWellBeingSatisfaction_weighted =
    convertToNumeric(employee_wellbeing_satisfaction) *
    employeeWellBeingSatisfaction_weight;
  const productRecallRate_weighted =
    convertToNumeric(product_recall_rate) * productRecallRate_weight;
  const workplaceImprovementActivities_weighted =
    convertToNumeric(workplace_improvement_activities) *
    workplaceImprovement_weight;
  const codeOfConduct_weighted =
    convertToNumeric(code_of_conduct) * humanRightsCode_weight;
  const resolveLabourViolations_weighted =
    convertToNumeric(resolve_labour_violations) *
    labourRightsRemediation_weight;
  const healthSafetyAssessments_weighted =
    convertToNumeric(health_safety_assessments) *
    healthSafetyAssessments_weight;
  const engageWithStakeholders_weighted =
    convertToNumeric(engage_with_stakeholders) * communityEngagement_weight;
  const skillUpgradesAdvancement_weighted =
    convertToNumeric(skill_upgrades_advancement) * skillUpgradeApproach_weight;
  const supplyChainPartnerEthics_weighted =
    convertToNumeric(supply_chain_partner_ethics) * supplyChainAction_weight;
  const underrepresentedWorkforce_weighted =
    convertToNumeric(underrepresented_workforce) *
    underrepresentedGroups_weight;
  const unconsciousBiasMitigation_weighted =
    convertToNumeric(unconscious_bias_mitigation) *
    unconsciousBiasAddress_weight;
  const communityContribution_weighted =
    convertToNumeric(community_contribution) *
    annualContributionLocalCommunities_weight;
  const supplyChainTransparency_weighted =
    convertToNumeric(supply_chain_transparency) *
    supplyChainTransparency_weight;
  const philanthropicSpending_weighted =
    convertToNumeric(philanthropic_spending) * philanthropicActivities_weight;

  const codeOfEthics_weighted =
    convertToNumeric(code_of_ethics) * codeOfEthics_weight;
  const potentialRisks_weighted =
    convertToNumeric(potential_risks) * identifyAssessRisks_weight;
  const riskManagementReview_weighted =
    convertToNumeric(risk_management_review) * riskManagementPractices_weight;
  const executiveCompensation_weighted =
    convertToNumeric(executive_compensation) *
    executiveCompensationDisclosure_weight;
  const diverseBoardNominations_weighted =
    convertToNumeric(diverse_board_nominations) * diverseCandidatesBoard_weight;
  const corruptionAllegations_weighted =
    convertToNumeric(corruption_allegations) *
    allegationsCorruptionUnethicalPractices_weight;
  const boardComposition_weighted =
    convertToNumeric(board_composition) * complianceTrainings_weight;
  const riskManagementCommittee_weighted =
    convertToNumeric(risk_management_committee) * whistleblowerHotline_weight;
  const independentAuditors_weighted =
    convertToNumeric(independent_auditors) * lobbyingDonations_weight;
  const stakeholderEngagementGovernance_weighted =
    convertToNumeric(stakeholder_engagement_governance) *
    rulesRegulationsUpdateFrequency_weight;
  const boardMeetingsFrequency_weighted =
    convertToNumeric(boardMeetingsFrequency_weight) *
    boardMeetingsFrequency_weight;
  const executiveCompensationSustainability_weighted =
    convertToNumeric(executiveCompensationSustainability_weight) *
    executiveCompensationSustainability_weight;

  // Calculate the ESG scores
  const environmentScore = Math.ceil(
    ((energyConsumption_weighted +
      waterConsumption_weighted +
      wasteProduction_weighted +
      wasteRecycled_weighted +
      co2Emissions_weighted +
      rawMaterialsReduction_weighted +
      co2EmissionsReduction_weighted +
      energyCosts_weighted +
      environmentalAccidents_weighted +
      siteEnergyEfficiency_weighted +
      reducedResourceUse_weighted +
      co2EmissionsComparison_weighted +
      recyclingRate_weighted) *
      100) /
      13
  ); // Total number of environmental parameters

  const socialScore = Math.ceil(
    ((employeeWellBeingSatisfaction_weighted +
      productRecallRate_weighted +
      workplaceImprovementActivities_weighted +
      codeOfConduct_weighted +
      resolveLabourViolations_weighted +
      healthSafetyAssessments_weighted +
      engageWithStakeholders_weighted +
      skillUpgradesAdvancement_weighted +
      supplyChainPartnerEthics_weighted +
      underrepresentedWorkforce_weighted +
      unconsciousBiasMitigation_weighted +
      communityContribution_weighted +
      supplyChainTransparency_weighted +
      philanthropicSpending_weighted) *
      100) /
      14
  ); // Total number of social parameters

  const governanceScore = Math.ceil(
    ((codeOfEthics_weighted +
      potentialRisks_weighted +
      riskManagementReview_weighted +
      executiveCompensation_weighted +
      diverseBoardNominations_weighted +
      corruptionAllegations_weighted +
      boardComposition_weighted +
      riskManagementCommittee_weighted +
      independentAuditors_weighted +
      stakeholderEngagementGovernance_weighted +
      boardMeetingsFrequency_weighted +
      executiveCompensationSustainability_weighted) *
      100) /
      12
  ); // Total number of governance parameters

  // Display the ESG scores
  const esgscore = Math.ceil(
    (environmentScore + governanceScore + socialScore) / 3
  );

  // Create a new instance of the ESGData model with the form data
  const esgData = new esguser({
    company_name,
    geographic_location,
    industry,
    annual_revenue,
    average_employees,
    new_hirings,
    values_documented,
    kpis_measured,
    objectives_risks,
    plan_actual_deviations,

    energy_consumption,
    water_consumption,
    waste_production,
    waste_recycled,
    co2_emissions,
    raw_materials_reduction,
    co2_emissions_reduction,
    energy_costs,
    environmental_accidents,
    site_energy_efficiency,
    resource_use_reduction,
    co2_emissions_comparison,
    recycling_rate,
    employee_wellbeing_satisfaction,
    product_recall_rate,
    workplace_improvement_activities,
    code_of_conduct,
    resolve_labour_violations,
    health_safety_assessments,
    engage_with_stakeholders,
    skill_upgrades_advancement,
    supply_chain_partner_ethics,
    underrepresented_workforce,
    unconscious_bias_mitigation,
    community_contribution,
    supply_chain_transparency,
    philanthropic_spending,
    code_of_ethics,
    potential_risks,
    risk_management_review,
    executive_compensation,
    diverse_board_nominations,
    corruption_allegations,
    board_composition,
    risk_management_committee,
    independent_auditors,
    stakeholder_engagement_governance,
  });
  // Save the data to the database
  // const submittedSecret = req.body.secret;
  // const currentUser = await user.findById(req.user.id);
  // if (req.isAuthenticated())
  // {

  // }
  // else res.redirect("/calculator");

  esgData
    .save()
    .then((savedData) => {
      console.log("Data saved to the database:", savedData);
      res.render("result", {
        company_name,
        environmentScore,
        socialScore,
        governanceScore,
        esgscore,
      });
    })
    .catch((error) => {
      console.log("Error saving data to the database:", error);
      res.render("error"); // Render an error page if the data cannot be saved
    });
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Running on port 3000");
});
