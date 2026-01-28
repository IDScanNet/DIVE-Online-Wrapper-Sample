# DIVE Online Sample App


This is a Sample App Utilizing the DIVE Online Web API in combination with the IDScan.net UI, also known as the Wrapper.

## Docs
https://docs.idscan.net/dive/dive-online/wrapper.html - For Wrapper installation,documentation, and CSS/UI configurations.

https://docs.idscan.net/dive/dive-online/api-manual.html - DIVE Online Web API Manual.

https://support.idscan.net/product-release-notes#digital-identity-verification - IDScan.net Release Notes

https://status.idscan.net/ - Status Page


https://support.idscan.net/dive-dive-online - External Knowledge Base

support@idscan.net

## Licenses

The .env in the sample app contains the necessary configurations for setting up licenses. Contact sales@idscan.net if you are interested in trying the product.

**VITE_DIVEONLINE_PROD_URL** = The base API endpoint for DIVE Online. Should NOT be changed from https://api-diveonline.idscan.net/

**VITE_DIVEONLINE_DOMAIN_ID**= The domain license for deploying the IDScan.net wrapper. Created on https://diveonline.idscan.net/domains , this token is used to initialize the IDScan.net Wrapper. 
For example, setting a domain for [localhost](https://localhost) would generate a token ########-####-####-####-############

As you deploy to different domains, different tokens will be needed.

The configurations set on the domains page in the portal will be pulled at runtime with the UI. Any configurations set in code will override the config in the portal.

If the DIVE Online Integrator also wants to send an SMS/email as backup, they will also need to adjust the config on https://diveonline.idscan.net/uiCustomization

**VITE_DIVEONLINE_PUBLIC_KEY**= Public key used to interface with the DIVE Online Web API. Found at https://diveonline.idscan.net/tokens . Also abbreviated to "pk".

**VITE_DIVEONLINE_SECRET_KEY**=  Secret key used to interface with the DIVE Online Web API. Found at https://diveonline.idscan.net/tokens . Also abbreviated to "sk".


## Endpoints
All DIVE Online endpoints are notated by "public" (pk) or "private" (sk). Public endpoints can use sk/pk while private can only use sk.

Example : api/v2/public/Validation

## Sample App

- ./src/API/index.ts : interface for the inital creation of applicants via  POST api/v2/private/Applicants. 

    The **sendSms** and **sendEmail** fields allow for the configuration to send a SMS/Email link that contains the same configuration as the fully embedded solution. This page is hosted by IDScan.net. 

- ./src/API/setup.ts : file for HTTP helpers that perform the API requests. 

- ./src/API/responses.d.ts : Type declartion file for the API responses of DIVE Online.

- ./src/helpers/DVSOCOnfig.ts : Helper that loads configs of account/UI based on the env file

- ./src/store/applicant.ts : State store managing applicant data and related actions/mutations.

- ./src/UI/main/init.ts : Main page for inital UI form fillout 

- ./src/UI/pages/main.ts : Main file for Wrapper Customization and configurations 

- style.css : Basic CSS file for sample app and IDScan.net UI

### Sample App Flow

- Step 1: App entry — application starts in .\src\main.ts and calls init() to bootstrap the UI flow.  

- Step 2: User fills out the applicant form and clicks "Create applicant" in .\src\UI\main\init.ts. 

- Step 3: Once the form is validated then call initApplicant() to create the applicant via the ./src/store/applicant.ts.

- Step 4: createApplicant in ./src/API/index.ts  builds the request body and calls the HTTP helper. This POST's to 'api/v2/private/Applicants and returns { applicantId, validationLink, ... }.

- Step 5:  call post() in src/API/setup.ts (helper) to perform the network request.

- Step 6: When applicantId returns from the POST request, continue UI flow and call mainPage(applicantId) in main.ts.

  
## Deploying App to localhost

  npm run dev
