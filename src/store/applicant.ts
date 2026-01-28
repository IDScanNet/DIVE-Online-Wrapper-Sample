import { createApplicant } from '../API';

const form = document.getElementById('login-wrapper') as HTMLFormElement;
// Step 3: initApplicant reads form values (firstName, lastName, email, phone)
// and calls the API layer to create the applicant.
export const initApplicant = async () => {
  const formData = new FormData(form);
  const keys = Array.from(formData.keys());
  const values = Array.from(formData.values());
  // read DOM fields...
  // Step 3 -> Step 4 transition: call createApplicant in index.ts
  const res: Record<string, any> = keys.reduce((acc, key, index) => {
      // resp contains applicantId (see CreateApplicantResponse)
    acc[key] = values[index];
    return acc;
  }, {} as Record<string, any>);
  const { applicantId } = await createApplicant(res);

  return applicantId;
};
