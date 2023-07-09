const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/what_is_esg", (req, res) => {
  res.render("what_is_esg");
});

app.get("/contact_us", (req, res) => {
  res.render("contact_us");
});
app.get("/calculator", (req, res) => {
  res.render("calculator");
});
app.post("/calculate_esg", (req, res) => {
  var company_name = req.body.company_name;

  var geographicLocation = req.body.geographicLocation;
  var industry = req.body.industry;
  var annualRevenue = req.body.annualRevenue;
  var avgEmployees = req.body.avgEmployees;
  var newHirings = req.body.newHirings;
  var sustainabilityReport = req.body.sustainabilityReport;
  var numKPIsMeasured = req.body.numKPIsMeasured;
  var objectivesAndRisks = req.body.objectivesAndRisks;
  var planActualDeviations = req.body.planActualDeviations;

  var energyConsumption = req.body.energyConsumption;
  var waterConsumption = req.body.waterConsumption;
  var wasteProduction = req.body.wasteProduction;
  var wasteRecycled = req.body.wasteRecycled;
  var co2Emissions = req.body.co2Emissions;
  var measuresToReduceRawMaterials = req.body.measuresToReduceRawMaterials;
  var measuresToReduceCo2Emissions = req.body.measuresToReduceCo2Emissions;
  var energyCosts = req.body.energyCosts;
  var numEnvironmentalAccidents = req.body.numEnvironmentalAccidents;
  var siteEnergyEfficiency = req.body.siteEnergyEfficiency;
  var reducedResourceUse = req.body.reducedResourceUse;
  var co2EmissionsMarketComparison = req.body.co2EmissionsMarketComparison;
  var recyclingRateComparison = req.body.recyclingRateComparison;

  var employeeWellBeingSatisfaction = req.body.employeeWellBeingSatisfaction;
  var productRecallRate = req.body.productRecallRate;
  var workplaceImprovement = req.body.workplaceImprovement;
  var humanRightsCode = req.body.humanRightsCode;
  var labourRightsRemediation = req.body.labourRightsRemediation;
  var healthSafetyAssessments = req.body.healthSafetyAssessments;
  var communityEngagement = req.body.communityEngagement;
  var skillUpgradeApproach = req.body.skillUpgradeApproach;
  var supplyChainAction = req.body.supplyChainActions;
  var underrepresentedGroups = req.body.underrepresentedGroups;
  var unconsciousBiasAddress = req.body.unconsciousBiasAddress;
  var annualContributionLocalCommunities =
    req.body.annualContributionLocalCommunities;
  var supplyChainTransparency = req.body.supplyChainTransparency;
  var philanthropicActivities = req.body.philanthropicActivities;

  var codeOfEthics = req.body.codeOfEthics;
  var identifyAssessRisks = req.body.identifyAssessRisks;
  var riskManagementPractices = req.body.riskManagementPractices;
  var executiveCompensationDisclosure =
    req.body.executiveCompensationDisclosure;
  var diverseCandidatesBoard = req.body.diverseCandidatesBoard;
  var allegationsCorruptionUnethicalPractices =
    req.body.allegationsCorruptionUnethicalPractices;
  var complianceTrainings = req.body.complianceTrainings;
  var whistleblowerHotline = req.body.whistleblowerHotline;
  var lobbyingDonations = req.body.lobbyingDonations;
  var rulesRegulationsUpdateFrequency =
    req.body.rulesRegulationsUpdateFrequency;
  var boardMeetingsFrequency = req.body.boardMeetingsFrequency;
  var executiveCompensationSustainability =
    req.body.executiveCompensationSustainability;

  // // Retrieve input parameters from the form
  // const company_name = req.body.company_name;
  // const carbon_footprint = parseFloat(req.body.carbon_footprint);

  // console.log(carbon_footprint);

  // const energy_consumption = parseFloat(req.body.energy_consumption);
  // const water_usage = parseFloat(req.body.water_usage);
  // const waste_management = parseFloat(req.body.waste_management);

  // // Define weights for each parameter
  // const carbon_footprint_weight = 0.3;
  // const energy_consumption_weight = 0.25;
  // const water_usage_weight = 0.2;
  // const waste_management_weight = 0.25;

  // // Normalize the input parameters to a scale of 0-100
  // const normalized_carbon_footprint = normalizeParameter(carbon_footprint);
  // const normalized_energy_consumption = normalizeParameter(energy_consumption);
  // const normalized_water_usage = normalizeParameter(water_usage);
  // const normalized_waste_management = normalizeParameter(waste_management);

  // // Calculate the weighted averages for ESG score and environmental score
  // const esg_score = (
  //   normalized_carbon_footprint * carbon_footprint_weight +
  //   normalized_energy_consumption * energy_consumption_weight +
  //   normalized_water_usage * water_usage_weight +
  //   normalized_waste_management * waste_management_weight
  // );

  // const environmental_score = esg_score; // In this example, environmental score is the same as the ESG score

  // // Render the result page with the calculated scores
  // res.render('result', { company_name, esg_score, environmental_score });
  res.render("result", { company_name });
});

// Function to normalize a parameter to a scale of 0-100
function normalizeParameter(value) {
  // Replace min and max values with actual minimum and maximum ranges for each parameter
  const min = 0;
  const max = 100;

  return ((value - min) / (max - min)) * 100;
}

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

app.listen(process.env.PORT || 3000, function () {
  console.log("Running on port 3000");
});

// Prompt the user to enter the desired port
