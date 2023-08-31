
const colNames = {
  hour: "שעה",
  expectToArrive: "צפי הגעה",
  company: "פלוגה",
  platoon: "מחלקה"
}

export const sheetTransformer = (rawData) => {

  const data = {    
    totalExpected: 0,
    totalArrived: 0,
  }

  const headerRow = rawData[0];
  const hourIdx = headerRow.indexOf(colNames.hour);
  const expectToArriveIdx = headerRow.indexOf(colNames.expectToArrive);
  const companyIdx = headerRow.indexOf(colNames.company);
  const platoonIdx = headerRow.indexOf(colNames.platoon);

  rawData.slice(1).forEach(row => {
    const companyName = row[companyIdx];

    data[companyName] = data[companyName] || {
      expected: 0,
      arrived: 0,
    };

    if (row[expectToArriveIdx] === "TRUE") {
      ++data.totalExpected;
      ++data[companyName].expected;
    }

    if (row[hourIdx].trim()) {
      ++data.totalArrived;
      ++data[companyName].arrived;
    }

  });

  data.raw = rawData;

  return data;
}