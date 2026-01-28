import { post } from './setup';

type UUID = string;

interface CreateApplicantResponse {
  applicantId: UUID,
  validationLink: string,
  shortValidationLink: string,
} //response interface

interface CreateApplicantBody {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  sendSms: boolean,
  sendEmail: boolean,
  //accountProfileId?: string,
} //request body interface

// Step 4: createApplicant builds the request body and calls the HTTP helper.
// This posts to 'api/v2/private/Applicants' and returns { applicantId, validationLink, ... }.
export const createApplicant = (
  {
    firstName,
    lastName,
    phone,
    email,
    sendSms = false, //can overwrite to send or not
    sendEmail = false, //can overwrite to send or not
    //accountProfileId  = '########-####-####-####-############', // profile ID to change between profiles from the DIVE Online web portal., 
  }: CreateApplicantBody | Record<string, any>,
): Promise<CreateApplicantResponse> => {
  const url = 'api/v2/private/Applicants';
  const body = {
    firstName: firstName !== '' ? firstName : 'John',
    lastName: lastName !== '' ? lastName : 'Doe',
    phone: phone !== '' ? phone : '+11234567890',
    email: email !== '' ? email : 'demo@demo.com',
    sendSms,
    //accountProfileId, 
    sendEmail,
  };
  // Step 4 -> Step 5: call post() in src/API/setup.ts to perform the network request.
  return post(url, body);
};