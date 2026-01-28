import DVSOIDVC from '@idscan/onboarding';
import IDVC2 from '@idscan/idvc2';
import DVSOConfig from '../../helpers/DVSOConfig';
import '../../style.css';
const loginWrapper = document.getElementById('login-wrapper') as HTMLDivElement;
const IDVC = document.getElementById('videoCapturingEl') as HTMLDivElement;

let lib: DVSOIDVC;

export default (applicantId: string) => {
  loginWrapper.classList.add('d-none');
  IDVC.classList.remove('d-none');

  const config = {

    /*
    * ANY configuration options set here will override the settings in the DIVE Online portal.
    *
    * For example, the documentTypes array in code here will override the document types set in the portal for the accountProfileId used.
    * https://diveonline.idscan.net/domains
    */

    /*applicantId = returned from Applicants endpoint
    * EX:
       {
        "applicantId": "fbd39729-d6a8-4f88-870e-7c0f6c3dc2a0", //passed to the DVSOConfig(applicantId)
        "validationLink": "...",
        "shortValidationLink": "..."
        }

        then ->     ...DVSOConfig(applicantId), 
    */
   
    ...DVSOConfig(applicantId), 
    allowCameraSelection: true,
    preferApiConfig: false,
    useCDN: true,
    networkUrl: 'networks',
    allowSubmitWithWarnings: false,
    autoContinue: true,
    fixFrontOrientAfterUpload: true,
    isShowDocumentTypeSelect: true,
    wrapperSettings: {
      showQRCode: true,
      showConsentForm: true,
      consentText: 'This can be customized consent text',
      checkboxText: "customized checkbox text",
    },//end wrapperSettings
    isShowGuidelinesButton: true,
    realFaceMode: 'all',
    resizeUploadedImage: 1400,
    getApplicantIdFromUrl: true,
    showSubmitBtn: true,
    // documentTypes: [
    //   { 
    //     type: "DL",
    //     tooltipText: "Custom Text here",
    //     steps: [
    //       {
    //         type: "front",
    //         name: "Document Front",
    //         delayUntilCaptureButtonVisible : 5000,
    //         mode: { uploader: false, video: true },
    //         autocaptureDelay: 500,
    //         enableDesktopNotification: true
    //       },
    //       {
    //         type: "Back",
    //         name: "Document PDF417 Barcode",
    //         mode: { uploader: true, video: true },
    //         autocaptureDelay: 500,
    //         enableDesktopNotification: true,
    //         enableFourCornerCapture: false
    //       },
    //       {
    //         type: "face",
    //         name: "Face",
    //         mode: { uploader: true, video: false },
    //       },
    //     ], 
    //   },//end DL
    //   {
    //     type: "IC",
    //     steps: [
    //       {
    //         type: "front",
    //         name: "Document's Frontside Image",
    //         delayUntilCaptureButtonVisible: 5000,
    //         mode: {uploader: true, video: true},
    //         enableDesktopNotification: true,
    //       },
    //       {
    //         type: "pdf",
    //         name: "Document Back",
    //         delayUntilCaptureButtonVisible: 5000,

    //         mode: {uploader: true, video: true},
    //         enableDesktopNotification: true,
    //         enableFourCornerCapture: false,

    //       },
    //       {
    //         type: "face",
    //         name: "Face",
    //         delayUntilCaptureButtonVisible: 5000,
    //         mode: {uploader: false, video: true},
    //       },
    //     ],
    //   },//end IC
    //   {
    //     type: "Passport",
    //     steps: [
    //       {
    //         type: "mrz",
    //         delayUntilCaptureButtonVisible: 5000,
    //         name: "Passport Front",

    //       },
    //       {
    //         type: "face",
    //         delayUntilCaptureButtonVisible: 5000,
    //         name: "Face",
    //       },
    //     ],
    //   },//end Passport
    //   {
    //     type: "PassportCard",
    //     steps: [
    //       {
    //         type: "front",
    //         delayUntilCaptureButtonVisible: 5000,
    //         name: "Passport Card Front",
    //       },
    //       {
    //         type: "mrz",
    //         delayUntilCaptureButtonVisible: 5000,
    //         name: "Passport Card Back",
    //       },
    //       {
    //         type: "face",
    //         delayUntilCaptureButtonVisible: 5000,
    //         name: "Face",
    //       },
    //     ],
    //   },//end PassportCard
    //   {
    //     type: "EmploymentAuthorization",
    //     steps: [
    //       {
    //         type: "front",
    //         name: "Employment Authorization Front",
    //         delayUntilCaptureButtonVisible: 5000,
    //       },
    //       {
    //         type: "mrz",
    //         name: "Employment Authorization Back",
    //         delayUntilCaptureButtonVisible: 5000,
    //       },
    //       {
    //         type: "face",
    //         name: "Face",
    //         delayUntilCaptureButtonVisible: 5000,
    //       },
    //     ],
    //   },//end EmploymentAuthorization
    //   {
    //     type: "GreenCard",
    //     steps: [
    //       {
    //         type: "front",
    //         delayUntilCaptureButtonVisible: 5000,
    //         name: "Green Card Front",
    //       },
    //       {
    //         type: "mrz",
    //         delayUntilCaptureButtonVisible: 5000,
    //         name: "Green Card Back",
    //       },
    //       {
    //         type: "face",
    //         delayUntilCaptureButtonVisible: 5000,

    //         name: "Face",
    //       },
    //     ],
    //   },//end GreenCard
    //   {
    //     type: "InternationalId",
    //     steps: [
    //       {
    //         type: "front",
    //         name: "International ID Front",
    //       },
    //       {
    //         type: "back",
    //         name: "International ID Back",
    //       },
    //       {
    //         type: "face",
    //         name: "Face",
    //       },
    //     ],
    //   },//end international ID
    // ],//end documentTypes
    callbacks: {
      submit(data: unknown) {
        //API call does not need to be manually added. The UI calls the API automatically.
      },
      onValidate(data: any) {
        
          console.log("Document is valid :", data.validationStatus.documentIsValid);
          //Here you can just consume the data or show a confirmation message. 
          //The data object is of type IValidationResponse (see src/API/responses.d.ts) This is based on the /Validation endpoint response.
      },
      onCameraError(data: any) {
        alert("onCameraError");
      },
    },//end callbacks
  };//end config object
  if (lib) {
    lib.updateConfig(JSON.stringify(config));
    lib.restart();
    lib.showLoader(true, "Re", "loading");
  } else {
    // @ts-ignore
    lib = new DVSOIDVC(config, IDVC2);
  }
};//end export default
