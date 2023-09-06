import gspread
from oauth2client.service_account import ServiceAccountCredentials


class GSheets:
    def __init__(self, sheetId):
        self.sheetId = sheetId
        # Define the scope and credentials
        scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
        credentials = ServiceAccountCredentials.from_json_keyfile_name(
            'rotstein.co.il_api-project-405201608861-397ee7fae789.json', scope)
        self.gc = gspread.authorize(credentials, client_factory=gspread.client.BackoffClient)

    def read(self):
      sheet = self.gc.open_by_key(self.sheetId)
      worksheet = sheet.get_worksheet(0)
      data = worksheet.get_all_values()
      return data
