import CloseIcon from '@mui/icons-material/Close';
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import Modal from '@mui/material/Modal';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';



const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      width: '100%'
    },
    listItem: {
      textAlign: 'right'
    },
    subHeader: {
      fontSize: theme.spacing(3)
    },
    closeIcon: {
      position: 'absolute',
      left: '17px',
      top: '59px',
      zIndex: 9999
    }
  }),
);

export function SoldierListModal({ open, onClose, data }) {
  console.log(data);
  const classes = useStyles();
  const [expectedData, setExpectedData] = useState([]);
  const [arrivedData, setArrivedData] = useState([]);


  useEffect(() => {
    const arrived = [];
    const expected = [];

    (data?.soldierList || []).forEach((s) => {
      if (s.arrivedAt) {
        arrived.push(s);
        return;
      }
      if (s.expected) {
        expected.push(s);
      }

      setExpectedData(expected);
      setArrivedData(arrived);
    });
  }, [data]);

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        className={classes.modal}
      >
        <>
          <CloseIcon fontSize="large" className={classes.closeIcon} onClick={onClose} />
          <List
            sx={{
              width: `${window.innerWidth - 20}px`,
              marginRight: '10px',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: `${window.innerHeight - 100}px`,
              marginTop: '50px',
              border: 'solid',
              borderRadius: 1,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {!!arrivedData?.length && <li key='section-arrived'>
              <ul>
                <ListSubheader className={classes.subHeader} sx={{ fontSize: '1.8rem' }}>הגיעו</ListSubheader>
                {arrivedData.map((item, idx) => (
                  <ListItem key={`item-arrived-${idx}`} className={classes.listItem} sx={{ textAlign: 'right' }}>
                    <ListItemText primary={`${item.name} (${item.arrivedAt})`} />
                  </ListItem>
                ))}
              </ul>
            </li>}
            {!!expectedData?.length && <li key='section-expected'>
              <ul>
                <ListSubheader className={classes.subHeader} sx={{ fontSize: '1.8rem' }}>צפויים להגיע</ListSubheader>
                {expectedData.map((item, idx) => (
                  <ListItem key={`item-expected-${idx}`} className={classes.listItem} sx={{ textAlign: 'right' }}>
                    <ListItemText primary={`${item.name}`} />
                  </ListItem>
                ))}
              </ul>
            </li>}
          </List>
        </>
      </Modal>
    </div>
  );
}