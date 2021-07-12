/* eslint-disable no-restricted-imports */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
import TabPanel from '../../Common/components/TabPanel/TabPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function TabBasic() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Item One" icon={<Icon>call</Icon>}  tabIndex={0} />
          <Tab label="Item Two" icon={<Icon>favorite_border</Icon>} tabIndex={1}  />
          <Tab label="Item Three" icon={<Icon>manage_accounts</Icon>} tabIndex={2}  />
          <Tab label="Item Four" icon={<Icon>verified</Icon>} tabIndex={3}  />
          <Tab label="Item Five" icon={<Icon>dashboard</Icon>} tabIndex={4}  />
          <Tab label="Item Six" icon={<Icon>star_rate</Icon>} tabIndex={5} />
          <Tab label="Item Seven" icon={<Icon>build</Icon>} tabIndex={6}  />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}


