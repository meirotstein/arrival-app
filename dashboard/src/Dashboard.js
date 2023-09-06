import { Chip, CircularProgress, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { BarChart } from '@mui/x-charts';
import React, { useEffect, useMemo, useState } from 'react';
import { loadData } from './Client';
import { SoldierListModal } from './SoldierListModal';
import { usePageVisibility } from './hooks/pageVisibility';

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

const TitleItem = styled(Item)(({ theme }) => ({
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

  const entries = useMemo(() => ({
    companyA: 'פלוגה א',
    companyB: 'פלוגה ב',
    companyC: 'פלוגה ג',
    companyMST: 'מסייעת',
    companyMFK: 'מפקדה',
  }), [])

  const [data, setData] = useState(null);
  const [arrivalPercentageBar, setArrivalPercentageBar] = useState([]);
  const [pollInterval, setPollIntervalId] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [loadErrorMsg, setLoadErrorMsg] = useState(undefined);
  const [openSoldierList, setOpenSoldierList] = useState(false);
  const [soldierListData, setSoldierListData] = useState(undefined);

  const classes = useStyles();


  const fetchData = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const data = await loadData();
      const percentageBarData = [
        data[entries.companyA]?.expected > 0 ?
          (data[entries.companyA].arrived / data[entries.companyA].expected) * 100 :
          0,
        data[entries.companyB]?.expected > 0 ?
          (data[entries.companyB].arrived / data[entries.companyB].expected) * 100 :
          0,
        data[entries.companyC]?.expected > 0 ?
          (data[entries.companyC].arrived / data[entries.companyC].expected) * 100 :
          0,
        data[entries.companyMST]?.expected > 0 ?
          (data[entries.companyMST].arrived / data[entries.companyMST].expected) * 100 :
          0,
        data[entries.companyMFK]?.expected > 0 ?
          (data[entries.companyMFK].arrived / data[entries.companyMFK].expected) * 100 :
          0,
      ]
      setData(data);
      setArrivalPercentageBar(percentageBarData)
      setLoadErrorMsg();

      console.log(data, percentageBarData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoadErrorMsg(error);
    } finally {
      setLoading(false);
    }
  };

  const pollStart = () => {
    if (!pollInterval) {
      fetchData();
      const interval = setInterval(() => {
        fetchData();
      }, 60000);
      setPollIntervalId(interval);
      console.log('start polling', interval);
    }
  };

  const pollEnd = () => {
    if (pollInterval) {
      console.log('stop polling', pollInterval);
      clearInterval(pollInterval);
      setPollIntervalId(undefined);
    }
  };

  useEffect(() => pollStart());
  usePageVisibility(pollStart, pollEnd);

  const openSoldierDataModal = (data) => {
    setSoldierListData(data);
    setOpenSoldierList(true);
  }

  return (
    <DashboardContainer>
      {data ? (<>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TitleItem>{`סה"כ הגיעו: ${data.totalArrived} מתוך ${data.totalExpected}`}</TitleItem>
          </Grid>
          <Grid item xs={6} onClick={() => openSoldierDataModal(data[entries.companyA])}>
            <TitleItem>פלוגה א</TitleItem>
            {data[entries.companyA] && <Item>{`${data[entries.companyA].arrived} מתוך ${data[entries.companyA].expected}`}</Item>}
          </Grid>
          <Grid item xs={6} onClick={() => openSoldierDataModal(data[entries.companyB])}>
            <TitleItem>פלוגה ב</TitleItem>
            {data[entries.companyB] && <Item>{`${data[entries.companyB].arrived} מתוך ${data[entries.companyB].expected}`}</Item>}
          </Grid>
          <Grid item xs={6} onClick={() => openSoldierDataModal(data[entries.companyC])}>
            <TitleItem>פלוגה ג</TitleItem>
            {data[entries.companyC] && <Item>{`${data[entries.companyC].arrived} מתוך ${data[entries.companyC].expected}`}</Item>}
          </Grid>
          <Grid item xs={6} onClick={() => openSoldierDataModal(data[entries.companyMST])}>
            <TitleItem>מסייעת</TitleItem>
            {data[entries.companyMST] && <Item>{`${data[entries.companyMST].arrived} מתוך ${data[entries.companyMST].expected}`}</Item>}
          </Grid>
          <Grid item xs={12} onClick={() => openSoldierDataModal(data[entries.companyMFK])}>
            <TitleItem>מפקדה</TitleItem>
            {data[entries.companyMFK] && <Item>{`${data[entries.companyMFK].arrived} מתוך ${data[entries.companyMFK].expected}`}</Item>}
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
            tooltip={{ trigger: 'item' }}
          />
        </div>
        {loading && <CircularProgress size={10} />}
        {loadErrorMsg && <Chip label={loadErrorMsg} color="error" />}
      </>
      ) : (
        <CircularProgress />
      )}
      <SoldierListModal open={openSoldierList} onClose={() => setOpenSoldierList(false)} data={soldierListData} />
    </DashboardContainer>
  );
}

export default Dashboard;
