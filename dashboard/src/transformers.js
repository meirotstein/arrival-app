
const colNames = {
  name: "שם",
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
  const nameIdx = headerRow.indexOf(colNames.name);
  const companyIdx = headerRow.indexOf(colNames.company);
  // const platoonIdx = headerRow.indexOf(colNames.platoon);

  rawData.slice(1).forEach(row => {
    const companyName = row[companyIdx];

    data[companyName] = data[companyName] || {
      expected: 0,
      arrived: 0,
      soldierList: [],
    };

    const soldier = {
      name: row[nameIdx],
      expected: false,
      arrivedAt: '',
    }

    if (row[expectToArriveIdx] === "TRUE") {
      ++data.totalExpected;
      ++data[companyName].expected;
      soldier.expected = true;
    }

    if (row[hourIdx].trim()) {
      ++data.totalArrived;
      ++data[companyName].arrived;
      soldier.arrivedAt = row[hourIdx];
    }

    data[companyName].soldierList.push(soldier);

  });

  data.raw = rawData;

  return data;
}