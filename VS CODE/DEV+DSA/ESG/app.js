require("dotenv").config(); ///Top placement

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

//npm i passport passport-local passport-local-mongoose express-session dotenv

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

///GOOGLE AUTH
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'images')));

const DB =
  "mongodb+srv://parth:parth123@cluster0.zj1fto2.mongodb.net/ESG?retryWrites=true&w=majority";

  app.use(
    session({
      secret: "Our little secret is here",
      resave: false,
      saveUninitialized: false,
    })
  );
  
  //passport documentation
  app.use(passport.initialize());
  app.use(passport.session());


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

const userSchema = new mongoose.Schema({
  // email: String,
  // password: String,
  googleId: String,
  secret: String,
}); ///Mongoose schema class///


userSchema.plugin(passportLocalMongoose); ///to hash and use our password
userSchema.plugin(findOrCreate); ///to create a new user using google oauth credentials

// Create the ESGData model
const user = mongoose.model("User", userSchema);
const esguser = mongoose.model("Euser", esgSchema);

passport.use(user.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/index",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      user.findOrCreate({ googleId: profile.id }, function (err, User) {
        return cb(err, User);
      });
    }
  )
);



app.get("/", (req, res) => {
  res.render("index");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/index",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/index");
  }
);


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

app.post("/calculate_esg", async (req, res) => {
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
    if (value === 'a') {
      return 3;
    } else if (value === 'b') {
      return 2;
    } else if (value === 'c') {
      return 1;
    } else {
      return 0; // Default value if the input is not 'a', 'b', or 'c'
    }
  };
  
  // Calculate weighted values for each field

  //Environment
  const energyConsumption_weighted = convertToNumeric(energyConsumption) * energyConsumption_weight;
  const waterConsumption_weighted = convertToNumeric(waterConsumption) * waterConsumption_weight;
  const wasteProduction_weighted = convertToNumeric(wasteProduction) * wasteProduction_weight;
  const wasteRecycled_weighted = convertToNumeric(wasteRecycled) * wasteRecycled_weight;
  const co2Emissions_weighted = convertToNumeric(co2Emissions) * co2Emissions_weight;
  const measuresToReduceRawMaterials_weighted = convertToNumeric(measuresToReduceRawMaterials) * measuresToReduceRawMaterials_weight;
  const measuresToReduceCo2Emissions_weighted = convertToNumeric(measuresToReduceCo2Emissions) * measuresToReduceCo2Emissions_weight;
  const energyCosts_weighted = convertToNumeric(energyCosts) * energyCosts_weight;
  const numEnvironmentalAccidents_weighted = convertToNumeric(numEnvironmentalAccidents) * numEnvironmentalAccidents_weight;
  const siteEnergyEfficiency_weighted = convertToNumeric(siteEnergyEfficiency) * siteEnergyEfficiency_weight;
  const reducedResourceUse_weighted = convertToNumeric(reducedResourceUse) * reducedResourceUse_weight;
  const co2EmissionsMarketComparison_weighted = convertToNumeric(co2EmissionsMarketComparison) * co2EmissionsMarketComparison_weight;
  const recyclingRateComparison_weighted = convertToNumeric(recyclingRateComparison) * recyclingRateComparison_weight;
  

  //Social
  const employeeWellBeingSatisfaction_weighted = convertToNumeric(employeeWellBeingSatisfaction) * employeeWellBeingSatisfaction_weight;
  const productRecallRate_weighted = convertToNumeric(productRecallRate) * productRecallRate_weight;
  const workplaceImprovement_weighted = convertToNumeric(workplaceImprovement) * workplaceImprovement_weight;
  const humanRightsCode_weighted = convertToNumeric(humanRightsCode) * humanRightsCode_weight;
  const labourRightsRemediation_weighted = convertToNumeric(labourRightsRemediation) * labourRightsRemediation_weight;
  const healthSafetyAssessments_weighted = convertToNumeric(healthSafetyAssessments) * healthSafetyAssessments_weight;
  const communityEngagement_weighted = convertToNumeric(communityEngagement) * communityEngagement_weight;
  const skillUpgradeApproach_weighted = convertToNumeric(skillUpgradeApproach) * skillUpgradeApproach_weight;
  const supplyChainAction_weighted = convertToNumeric(supplyChainAction) * supplyChainAction_weight;
  const underrepresentedGroups_weighted = convertToNumeric(underrepresentedGroups) * underrepresentedGroups_weight;
  const unconsciousBiasAddress_weighted = convertToNumeric(unconsciousBiasAddress) * unconsciousBiasAddress_weight;
  const annualContributionLocalCommunities_weighted = convertToNumeric(annualContributionLocalCommunities) * annualContributionLocalCommunities_weight;
  const supplyChainTransparency_weighted = convertToNumeric(supplyChainTransparency) * supplyChainTransparency_weight;
  const philanthropicActivities_weighted = convertToNumeric(philanthropicActivities) * philanthropicActivities_weight;
  

  //Governance
  const codeOfEthics_weighted = convertToNumeric(codeOfEthics) * codeOfEthics_weight;
  const identifyAssessRisks_weighted = convertToNumeric(identifyAssessRisks) * identifyAssessRisks_weight;
  const riskManagementPractices_weighted = convertToNumeric(riskManagementPractices) * riskManagementPractices_weight;
  const executiveCompensationDisclosure_weighted = convertToNumeric(executiveCompensationDisclosure) * executiveCompensationDisclosure_weight;
  const diverseCandidatesBoard_weighted = convertToNumeric(diverseCandidatesBoard) * diverseCandidatesBoard_weight;
  const allegationsCorruptionUnethicalPractices_weighted = convertToNumeric(allegationsCorruptionUnethicalPractices) * allegationsCorruptionUnethicalPractices_weight;
  const complianceTrainings_weighted = convertToNumeric(complianceTrainings) * complianceTrainings_weight;
  const whistleblowerHotline_weighted = convertToNumeric(whistleblowerHotline) * whistleblowerHotline_weight;
  const lobbyingDonations_weighted = convertToNumeric(lobbyingDonations) * lobbyingDonations_weight;
  const rulesRegulationsUpdateFrequency_weighted = convertToNumeric(rulesRegulationsUpdateFrequency) * rulesRegulationsUpdateFrequency_weight;
  const boardMeetingsFrequency_weighted = convertToNumeric(boardMeetingsFrequency) * boardMeetingsFrequency_weight;
  const executiveCompensationSustainability_weighted = convertToNumeric(executiveCompensationSustainability) * executiveCompensationSustainability_weight;
  

// Calculate the ESG scores
const environmentScore =Math.ceil(
  (energyConsumption_weighted +
    waterConsumption_weighted +
    wasteProduction_weighted +
    wasteRecycled_weighted +
    co2Emissions_weighted +
    measuresToReduceRawMaterials_weighted +
    measuresToReduceCo2Emissions_weighted +
    energyCosts_weighted +
    numEnvironmentalAccidents_weighted +
    siteEnergyEfficiency_weighted +
    reducedResourceUse_weighted +
    co2EmissionsMarketComparison_weighted +
    recyclingRateComparison_weighted)*100 /
  13); // Total number of environmental parameters

const socialScore =Math.ceil(
  (employeeWellBeingSatisfaction_weighted +
    productRecallRate_weighted +
    workplaceImprovement_weighted +
    humanRightsCode_weighted +
    labourRightsRemediation_weighted +
    healthSafetyAssessments_weighted +
    communityEngagement_weighted +
    skillUpgradeApproach_weighted +
    supplyChainAction_weighted +
    underrepresentedGroups_weighted +
    unconsciousBiasAddress_weighted +
    annualContributionLocalCommunities_weighted +
    supplyChainTransparency_weighted +
    philanthropicActivities_weighted) *100 /
  14); // Total number of social parameters

const governanceScore =Math.ceil(
  (codeOfEthics_weighted +
    identifyAssessRisks_weighted +
    riskManagementPractices_weighted +
    executiveCompensationDisclosure_weighted +
    diverseCandidatesBoard_weighted +
    allegationsCorruptionUnethicalPractices_weighted +
    complianceTrainings_weighted +
    whistleblowerHotline_weighted +
    lobbyingDonations_weighted +
    rulesRegulationsUpdateFrequency_weighted +
    boardMeetingsFrequency_weighted +
    executiveCompensationSustainability_weighted)*100 /
  12); // Total number of governance parameters

// Display the ESG scores
const esgscore=Math.ceil((environmentScore+governanceScore+socialScore)/3);

    // Create a new instance of the ESGData model with the form data
    const esgData = new esguser({
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
  // const submittedSecret = req.body.secret;
  // const currentUser = await user.findById(req.user.id);
  // if (req.isAuthenticated())
  // {

  // }
  // else res.redirect("/calculator");


  esgData.save()
  .then((savedData) => {
    console.log("Data saved to the database:", savedData);
    res.render("result", { company_name,environmentScore,socialScore,governanceScore,esgscore });
  })
  .catch((error) => {
    console.log("Error saving data to the database:", error);
    res.render("error"); // Render an error page if the data cannot be saved
  });

});
app.listen(process.env.PORT || 3000, function () {
  console.log("Running on port 3000");
});
