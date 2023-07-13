const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'images')));

const DB =
  "mongodb+srv://parth:parth123@cluster0.zj1fto2.mongodb.net/ESG?retryWrites=true&w=majority";


mongoose.connect(DB, {
  useNewUrlParser: true,
  // useCreateIndex:true,
  // useUnifiedTopology: true,
  // useFindAndModify: false
});

const esgDataSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  geographicLocation: String,
  industry: String,
  annualRevenue: Number,
  avgEmployees: Number,
  newHirings: Number,
  sustainabilityReport: String,
  numKPIsMeasured: Number,
  objectivesAndRisks: String,
  planActualDeviations: String,
  energyConsumption: String,
  waterConsumption: String,
  wasteProduction: String,
  wasteRecycled: String,
  co2Emissions: String,
  measuresToReduceRawMaterials: String,
  measuresToReduceCo2Emissions: String,
  energyCosts: String,
  numEnvironmentalAccidents: String,
  siteEnergyEfficiency: String,
  reducedResourceUse: String,
  co2EmissionsMarketComparison: String,
  recyclingRateComparison: String,
  employeeWellBeingSatisfaction: String,
  productRecallRate: String,
  workplaceImprovement: String,
  humanRightsCode: String,
  labourRightsRemediation: String,
  healthSafetyAssessments: String,
  communityEngagement: String,
  skillUpgradeApproach: String,
  supplyChainAction: String,
  underrepresentedGroups: String,
  unconsciousBiasAddress: String,
  annualContributionLocalCommunities: String,
  supplyChainTransparency: String,
  philanthropicActivities: String,
  codeOfEthics: String,
  identifyAssessRisks: String,
  riskManagementPractices: String,
  executiveCompensationDisclosure: String,
  diverseCandidatesBoard: String,
  allegationsCorruptionUnethicalPractices: String,
  complianceTrainings: String,
  whistleblowerHotline: String,
  lobbyingDonations: String,
  rulesRegulationsUpdateFrequency: String,
  boardMeetingsFrequency: String,
  executiveCompensationSustainability: String
});

// Create the ESGData model
const ESGData = mongoose.model("ESGData", esgDataSchema);

app.get("/", (req, res) => {
  res.render("index");
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

app.get("/recommend",function(req,res){
  res.render("recommend");
})

app.post("/calculate_esg", (req, res) => {
  const {
    company_name,
    geographicLocation,
    industry,
    annualRevenue,
    avgEmployees,
    newHirings,
    sustainabilityReport,
    numKPIsMeasured,
    objectivesAndRisks,
    planActualDeviations,
    energyConsumption,
    waterConsumption,
    wasteProduction,
    wasteRecycled,
    co2Emissions,
    measuresToReduceRawMaterials,
    measuresToReduceCo2Emissions,
    energyCosts,
    numEnvironmentalAccidents,
    siteEnergyEfficiency,
    reducedResourceUse,
    co2EmissionsMarketComparison,
    recyclingRateComparison,
    employeeWellBeingSatisfaction,
    productRecallRate,
    workplaceImprovement,
    humanRightsCode,
    labourRightsRemediation,
    healthSafetyAssessments,
    communityEngagement,
    skillUpgradeApproach,
    supplyChainAction,
    underrepresentedGroups,
    unconsciousBiasAddress,
    annualContributionLocalCommunities,
    supplyChainTransparency,
    philanthropicActivities,
    codeOfEthics,
    identifyAssessRisks,
    riskManagementPractices,
    executiveCompensationDisclosure,
    diverseCandidatesBoard,
    allegationsCorruptionUnethicalPractices,
    complianceTrainings,
    whistleblowerHotline,
    lobbyingDonations,
    rulesRegulationsUpdateFrequency,
    boardMeetingsFrequency,
    executiveCompensationSustainability
  } = req.body;

  // Create a new instance of the ESGData model with the form data
  const esgData = new ESGData({
    company_name,
    geographicLocation,
    industry,
    annualRevenue,
    avgEmployees,
    newHirings,
    sustainabilityReport,
    numKPIsMeasured,
    objectivesAndRisks,
    planActualDeviations,
    energyConsumption,
    waterConsumption,
    wasteProduction,
    wasteRecycled,
    co2Emissions,
    measuresToReduceRawMaterials,
    measuresToReduceCo2Emissions,
    energyCosts,
    numEnvironmentalAccidents,
    siteEnergyEfficiency,
    reducedResourceUse,
    co2EmissionsMarketComparison,
    recyclingRateComparison,
    employeeWellBeingSatisfaction,
    productRecallRate,
    workplaceImprovement,
    humanRightsCode,
    labourRightsRemediation,
    healthSafetyAssessments,
    communityEngagement,
    skillUpgradeApproach,
    supplyChainAction,
    underrepresentedGroups,
    unconsciousBiasAddress,
    annualContributionLocalCommunities,
    supplyChainTransparency,
    philanthropicActivities,
    codeOfEthics,
    identifyAssessRisks,
    riskManagementPractices,
    executiveCompensationDisclosure,
    diverseCandidatesBoard,
    allegationsCorruptionUnethicalPractices,
    complianceTrainings,
    whistleblowerHotline,
    lobbyingDonations,
    rulesRegulationsUpdateFrequency,
    boardMeetingsFrequency,
    executiveCompensationSustainability
  });

  // Save the data to the database
  esgData.save()
    .then((savedData) => {
      console.log("Data saved to the database:", savedData);
      res.render("result", { company_name });
    })
    .catch((error) => {
      console.log("Error saving data to the database:", error);
      res.render("error"); // Render an error page if the data cannot be saved
    });
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Running on port 3000");
});
