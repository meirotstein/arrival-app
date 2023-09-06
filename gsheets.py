import gspread
from oauth2client.service_account import ServiceAccountCredentials
import datetime

# global variable for caching
lastReadCall = None
lastReadResult = None


class GSheets:
    def __init__(self, sheetId):
        self.sheetId = sheetId
        # Define the scope and credentials
        scope = ['https://spreadsheets.google.com/feeds',
                 'https://www.googleapis.com/auth/drive']
        credentials = ServiceAccountCredentials.from_json_keyfile_name(
            'rotstein.co.il_api-project-405201608861-397ee7fae789.json', scope)
        self.gc = gspread.authorize(
            credentials, client_factory=gspread.client.BackoffClient)

    def read(self, useCache):
        global lastReadCall, lastReadResult
        if (useCache and lastReadCall is not None and lastReadResult is not None):
            now = datetime.datetime.now()
            difference = now - lastReadCall
            if (difference.total_seconds() <= 2):
                print('using cache for read call')
                return lastReadResult
        
        lastReadCall = datetime.datetime.now()
        sheet = self.gc.open_by_key(self.sheetId)
        worksheet = sheet.get_worksheet(0)
        lastReadResult = worksheet.get_all_values()
        print('save timestamp and data for future cache', lastReadCall)
        return lastReadResult
