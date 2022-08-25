// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.scss';
import '@finastra/app-bar';
import '@finastra/button';
import '@finastra/user-profile';
import '@finastra/dialog';
import '@finastra/icon-button'; 
import '@finastra/icon';
import '@finastra/sidenav';
import '@finastra/logo';
import '@finastra/logo';
import '@finastra/checkbox';
import '@finastra/account-card';
import '@finastra/skeleton';
import '@finastra/list';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import Sheet from '../components/transaction-component/transaction-widget';
import QuickTransfer from '../components/quicktransfer-component/quick-transfer-widget';
import MyAdvisor from '../components/myadvisor-component/myadvisor-widget';
import Chart from '../components/chart-component/chart-component';
import Carousel from '../components/carousel-component/carousel-component';
import AccountSkeleton from '../components/skeleton-card-component/skeleton-component';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function App() {

  const serverUri = '';
  const serviceId1 = 'CONSUMER_PROFILE';
  const serviceId2 = 'ACCOUNT_INFORMATION_US';
  
  const target1 = `/profile`;
  const target2 = `/accounts/extended`;
  

  let [firstName, setFirstName] = useState("");
  let [email, setEmail] = useState("");
  let [fullName, setFullName] = useState("");
  let [accounts, setAccounts] = useState([]);
  
  const theme = createTheme({
    breakpoints: {
      values: {
        sm: 270,
        md: 540,
        lg: 810,
        xl: 1080,
        xll: 1350,
        xlll: 1620,
      },
    },
  });

  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  const xll = useMediaQuery(theme.breakpoints.up('xll'));
  const xlll = useMediaQuery(theme.breakpoints.up('xlll'));

  const n = 7;

  const getProfile = useCallback(async () => {
    try {
      const response = await fetch(`${serverUri}/proxy?serviceId=${serviceId1}&target=${target1}`);
      const data = await response.json();
      setFirstName(data.firstName);
      setFullName(data.firstName +" " + data.lastName);
      setEmail(data.emails[0].address);
    }
    catch (e) {
      console.log(e)
    }
})

const getAccounts = useCallback(async () => {
  try {
    const response = await fetch(`${serverUri}/proxy?serviceId=${serviceId2}&target=${target2}`);
    const data = await response.json();
    setAccounts(data);
  }
  catch (e) {
    console.log(e)
  }
})

  useEffect(() => {
    getProfile();
    getAccounts();
  }, [])

  return (
    <div className="App">
      <fds-sidenav type="modal">
      <div slot="sidenavContent">
        <div className="fds-sidenav-header">
          <fds-logo></fds-logo>
        </div>
        <div className="fds-sidenav-list">
          <fds-list activatable="">
            <fds-list-item selected="" graphic="icon">
              <span>Home</span>
              <fds-icon slot="graphic">home</fds-icon>
            </fds-list-item>
            <fds-list-item graphic="icon">
              <span>Applications</span>
              <fds-icon slot="graphic">dashboard</fds-icon>
            </fds-list-item>
            <fds-list-item graphic="icon">
              <span>Tools</span>
              <fds-icon slot="graphic">extension</fds-icon>
            </fds-list-item>
            <fds-list-item graphic="icon">
              <span>Settings</span>
              <fds-icon slot="graphic">settings</fds-icon>
            </fds-list-item>
          </fds-list>
        </div>
      </div>
      <div slot="appContent">
        <fds-app-bar logoredirecturi="">
          <fds-icon-button icon="menu" slot="navigationIcon"></fds-icon-button>
          <fds-icon-button icon="search" slot="actions"></fds-icon-button>
          <fds-icon-button icon="notifications_none" slot="actions"></fds-icon-button>
          <fds-icon-button icon="help_outline" slot="actions"></fds-icon-button>
          <fds-user-profile slot="actions" username={fullName}>
          <div slot="userInfo">{email}</div>
          <div slot="actions">
            <fds-button fullwidth="" label="Logout" icon="logout"></fds-button>
            <fds-button text="" fullwidth="" label="View profile"></fds-button>
          </div>
          </fds-user-profile>
          <fds-icon-button icon="more_vert" slot="actions"></fds-icon-button>
        </fds-app-bar>
        <div className="header">
          <div className="header-title dark-theme">
            <div className="header-icon">
              <img width={64} height={64} src={require("../assets/Header-Icon.png")}/>
            </div>
            <div className="app-title">
              <span>Retail app</span>
              <div className="welcome-msg">
                {firstName === "" ? <fds-skeleton/> : <span> Welcome Back, {firstName}</span>}
              </div>
            </div>
          </div> 
          <div className="cards">
            {accounts.length === 0 ? 
              <Carousel show={ !sm ? 0 : !md ? 1 : !lg ? 2 : !xl ? 3 : !xll ? 4 : !xlll ? 5 : 6 } loading>
               { [...Array(n)].map(() =>
                    <div className="card">
                      <AccountSkeleton/>
                    </div>
               )}
              </Carousel> : 
              <Carousel show={ !sm ? 0 : !md ? 1 : !lg ? 2 : !xl ? 3 : !xll ? 4 : !xlll ? 5 : 6 } >
                {accounts.map(account => {
                  return(
                  <div className="card">
                    <fds-account-card name={account.nickname} balance={account.balances[0].amount} number={account.accountNumber} currency="USD"/>
                  </div>)
                })}
              </Carousel>
            }
          </div>
        </div>
        <div className="content">
          <div className="main-content">
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                  <Sheet/>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="side-content">
                  <QuickTransfer/>
                </div> 
                <div className="side-content">
                  <Chart/>
                </div> 
                <div className="side-content">
                  <MyAdvisor/>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        
      </div>
      </fds-sidenav>
    </div>
  );
}

export default App;
