import { getAccessToken } from '../auth';

export const appendLeadToSheet = async (values: any[]) => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('No access token available. Please sign in with Google.');
  }

  const SPREADSHEET_ID = '125Xqh5bmze6OraxHo_wjCo4B2Lm5-RVXvAXw-GDzatU';
  const range = 'A:Z'; 

  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range,
      majorDimension: 'ROWS',
      values: [
        values
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to append to sheet: ${errorData.error?.message || response.statusText}`);
  }

  return await response.json();
};
