import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid, Paper } from '@mui/material';
import { loadData } from './Client';
import { styled } from '@mui/material/styles';

const DashboardContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
  textAlign: 'center',
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A2027',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 0,
  fontSize: theme.spacing(2)
}));

const TitleItem= styled(Item)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.spacing(3)
}));

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadData();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const entries = {
    companyA: 'פלוגה א',
    companyB: 'פלוגה ב',
    companyC: 'פלוגה ג',
    companyMST: 'מסייעת',
    companyMFK: 'מפקדה',
  }

  return (
    <DashboardContainer>
      {data ? (<Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleItem>{`סה"כ הגיעו: ${data.totalArrived} מתוך ${data.totalExpected}`}</TitleItem>
        </Grid>
        <Grid item xs={6}>
          <TitleItem>פלוגה א</TitleItem>
          <Item>{`${data[entries.companyA].arrived} מתוך ${data[entries.companyA].expected}`}</Item>
        </Grid>
        <Grid item xs={6}>
          <TitleItem>פלוגה ב</TitleItem>
          <Item>{`${data[entries.companyB].arrived} מתוך ${data[entries.companyB].expected}`}</Item>
        </Grid>
        <Grid item xs={6}>
          <TitleItem>פלוגה ג</TitleItem>
          <Item>{`${data[entries.companyC].arrived} מתוך ${data[entries.companyC].expected}`}</Item>
        </Grid>
        <Grid item xs={6}>
          <TitleItem>מסייעת</TitleItem>
          <Item>{`${data[entries.companyMST].arrived} מתוך ${data[entries.companyMST].expected}`}</Item>
        </Grid>
        <Grid item xs={12}>
          <TitleItem>מפקדה</TitleItem>
          <Item>{`${data[entries.companyMFK].arrived} מתוך ${data[entries.companyMFK].expected}`}</Item>
        </Grid>
      </Grid>) : (
        <CircularProgress disableShrink />
      )}
      {/* {data ? (
        <div>
          <h2>Fetched Sheet data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}
    </DashboardContainer>
  );
}

export default Dashboard;
