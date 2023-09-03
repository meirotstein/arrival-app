import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { loadData } from './Client';
import { styled } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

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

const useStyles = makeStyles((theme) =>
  createStyles({
    chart: {
      marginLeft: theme.spacing(2),
      marginTop: `-${theme.spacing(7)}`
    },
  }),
);

function Dashboard() {
  const [data, setData] = useState(null);
  const [arrivalPercentageBar, setArrivalPercentageBar] = useState([]);
  const classes = useStyles();

  const entries = {
    companyA: 'פלוגה א',
    companyB: 'פלוגה ב',
    companyC: 'פלוגה ג',
    companyMST: 'מסייעת',
    companyMFK: 'מפקדה',
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadData();
        const percentageBarData = [
          data[entries.companyA].expected > 0 ?
            (data[entries.companyA].arrived / data[entries.companyA].expected)*100:
            0,
          data[entries.companyB].expected > 0 ?
            (data[entries.companyB].arrived / data[entries.companyB].expected)*100:
            0,
          data[entries.companyC].expected > 0 ?
            (data[entries.companyC].arrived / data[entries.companyC].expected)*100:
            0,
          data[entries.companyMFK].expected > 0 ?
            (data[entries.companyMFK].arrived / data[entries.companyMFK].expected)*100:
            0,
          data[entries.companyMST].expected > 0 ?
            (data[entries.companyMST].arrived / data[entries.companyMST].expected)*100:
            0,
        ]
        setData(data);
        setArrivalPercentageBar(percentageBarData)

        console.log(data, percentageBarData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [entries]);

  return (
    <DashboardContainer>
      {data ? (<>
      <Grid container spacing={2}>
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
      </Grid>
      <div className={classes.chart}>
      <BarChart
          xAxis={[
            {
              id: 'company',
              data: [entries.companyA, entries.companyB, entries.companyC, entries.companyMST, entries.companyMFK],
              scaleType: 'band',
            },
          ]}
          yAxis={[
            {
              max: 100,
              label: 'אחוז התייצבות',
            }
          ]}
          series={[
            {
              data: arrivalPercentageBar,
            },
          ]}
          width={window.innerWidth - 20}
          height={300}
        />
        </div>
      </>
      ) : (
        <CircularProgress disableShrink />
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
