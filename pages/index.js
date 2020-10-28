import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';
import EnhancedTable from '../src/ui/EnhancendTable';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
  button: {
    color: '#fff',
    backgroundColor: theme.palette.common.orange,
    borderRadius: 15,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
    search,
  };
}

export default function Index() {
  const classes = useStyles();
  const theme = useTheme();

  const [rows, setRows] = useState([
    createData(
      'website',
      '11/2/19',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '$2500',
      true
    ),
    createData(
      'website2',
      '11/2/19',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '$500',
      true
    ),
    createData(
      'custome software',
      '11/2/19',
      'Custom Software',
      'photo/video, GPS',
      'N/A',
      'N/A',
      'N/A',
      '$1500',
      true
    ),
    createData(
      'ios and andriod',
      '11/2/19',
      'Mobile App',
      'iOS, Andriod',
      'N/A',
      'iOS, Andriod',
      'N/A',
      '$3000',
      true
    ),
    createData(
      'andriod',
      '11/2/19',
      'Mobile App',
      'Andriod',
      'N/A',
      'Andriod',
      'N/A',
      '$5000',
      true
    ),
    createData(
      'Mohamed N',
      '11/2/19',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '$1500',
      true
    ),
    createData(
      'custome software2',
      '11/2/19',
      'Custom Software',
      'photo/video, GPS',
      'N/A',
      'N/A',
      'N/A',
      '$1500',
      true
    ),
  ]);

  const platformOption = ['Web', 'iOS', 'Android'];
  const featuresOption = [
    'Photo/Video',
    'GPS',
    'File transfer',
    'User/Authentication',
    'Biometrics',
    'Push Notifications',
  ];
  const websiteOption = ['Basic', 'Interactive', 'E-Commerce'];
  const [websiteChecked, setWebiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [andriodChecked, setAndriodChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());

  const [total, setTotal] = useState('');

  const [service, setService] = useState('');
  const [complexity, setComplexity] = useState('');
  const [users, setUsers] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, 'MM/dd/yy'),
        service,
        features.join(', '),
        service === 'Website' ? 'N/A' : complexity,
        service === 'Website' ? 'N/A' : platforms.join(', '),
        users,
        `$${total}`,
        true
      ),
    ]);
    setDialogOpen(false);
    setName('');
    setDate(new Date());
    setService('');
    setTotal('');
    setComplexity('');
    setUsers('');
    setFeatures([]);
    setPlatforms([]);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);

    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );

    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
    setPage(0);
  };

  const serviceQuestion = (
    <>
      <Grid item style={{ marginTop: matchesSM ? 20 : '5em' }}>
        <Typography variant='h4'>Service</Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label='service'
          name='service'
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setFeatures([]);
          }}
        >
          <FormControlLabel
            classes={{ label: classes.service }}
            value='Website'
            label='Website'
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value='Mobile App'
            label='Mobile App'
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value='Custom Software'
            label='Custom Software'
            control={<Radio />}
          />
        </RadioGroup>
      </Grid>
    </>
  );

  const complexityQuestion = (
    <>
      <Grid item style={{ marginBottom: matchesSM ? 50 : null }}>
        <Grid
          item
          container
          direction='column'
          style={{ marginTop: matchesSM ? 50 : '5em' }}
        >
          <Grid item>
            <Typography variant='h4'>Complexity</Typography>
          </Grid>
          <Grid item>
            <RadioGroup
              aria-label='Complexity'
              name='Complexity'
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
            >
              <FormControlLabel
                disabled={service === 'Website'}
                classes={{ label: classes.service }}
                value='Low'
                label='Low'
                control={<Radio />}
              />
              <FormControlLabel
                disabled={service === 'Website'}
                classes={{ label: classes.service }}
                value='Medium'
                label='Medium'
                control={<Radio />}
              />
              <FormControlLabel
                disabled={service === 'Website'}
                classes={{ label: classes.service }}
                value='High'
                label='High'
                control={<Radio />}
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  const userQuestions = (
    <>
      <Grid item style={{ alignSelf: matchesSM ? 'center' : 'flex-end' }}>
        <Grid
          item
          container
          direction='column'
          style={{ marginTop: matchesSM ? 50 : '5em' }}
        >
          <Grid item>
            <Typography variant='h4'>Users</Typography>
          </Grid>
          <Grid item>
            <RadioGroup
              aria-label='Users'
              name='Users'
              value={users}
              onChange={(e) => setUsers(e.target.value)}
            >
              <FormControlLabel
                disabled={service === 'Website'}
                classes={{
                  label: classes.service,
                  root: classes.users,
                }}
                value='0-10'
                label='0-10'
                control={<Radio />}
              />
              <FormControlLabel
                disabled={service === 'Website'}
                classes={{
                  label: classes.service,
                  root: classes.users,
                }}
                value='10-100'
                label='10-100'
                control={<Radio />}
              />
              <FormControlLabel
                disabled={service === 'Website'}
                classes={{
                  label: classes.service,
                  root: classes.users,
                }}
                value='100+'
                label='100+'
                control={<Radio />}
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        direction='column'
        alignItems={matchesSM ? 'center' : undefined}
      >
        <Grid
          item
          style={{ marginTop: '2em', marginLeft: matchesSM ? 0 : '5em' }}
        >
          <Typography variant='h1'>Project</Typography>
        </Grid>
        <Grid item>
          <TextField
            style={{
              width: matchesSM ? '25em' : '35em',
              marginLeft: matchesSM ? 0 : '5em',
            }}
            placeholder='Search prject details or create a new entry.'
            value={search}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  style={{ cursor: 'pointer' }}
                  position='end'
                  onClick={() => setDialogOpen(true)}
                >
                  <AddIcon color='primary' style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          style={{ marginLeft: matchesSM ? 0 : '5em', marginTop: '2em' }}
        >
          <FormGroup row>
            <Grid
              container
              direction={matchesSM ? 'column' : 'row'}
              justify={matchesSM ? 'center' : undefined}
            >
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : '5em' }}
                  control={
                    <Switch
                      checked={websiteChecked}
                      color='primary'
                      onChange={() => setWebiteChecked(!websiteChecked)}
                    />
                  }
                  label='Website'
                  labelPlacement={matchesSM ? 'end' : 'start'}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : '5em' }}
                  control={
                    <Switch
                      checked={iOSChecked}
                      color='primary'
                      onChange={() => setIOSChecked(!iOSChecked)}
                    />
                  }
                  label='iOS Apps'
                  labelPlacement={matchesSM ? 'end' : 'start'}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : '5em' }}
                  control={
                    <Switch
                      checked={andriodChecked}
                      color='primary'
                      onChange={() => setAndriodChecked(!andriodChecked)}
                    />
                  }
                  label='Andriod Apps'
                  labelPlacement={matchesSM ? 'end' : 'start'}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={softwareChecked}
                      color='primary'
                      onChange={() => setSoftwareChecked(!softwareChecked)}
                    />
                  }
                  label='Custom Software'
                  labelPlacement={matchesSM ? 'end' : 'start'}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid
          item
          style={{
            marginTop: '5em',
            maxWidth: '100%',
            marginBottom: matchesMD ? '40em' : '35em',
          }}
        >
          <EnhancedTable
            rows={rows}
            page={page}
            setPage={setPage}
            setRows={setRows}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            andriodChecked={andriodChecked}
            softwareChecked={softwareChecked}
          />
        </Grid>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          fullWidth
          fullScreen={matchesSM}
          style={{ zIndex: '1302' }}
          maxWidth='md'
        >
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='h1' gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid
              container
              justify='space-between'
              direction={matchesSM ? 'column' : 'row'}
            >
              <Grid item>
                <Grid
                  item
                  container
                  direction='column'
                  alignItems={matchesSM ? 'center' : undefined}
                  sm
                >
                  <Hidden mdUp>{serviceQuestion}</Hidden>

                  <Hidden mdUp>{userQuestions}</Hidden>
                  <Hidden mdUp>{complexityQuestion}</Hidden>
                  <Grid item>
                    <TextField
                      label='name'
                      style={{ width: matchesSM ? 250 : undefined }}
                      id='name'
                      fullWidth={!matchesSM}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction='column'
                    alignItems={matchesSM ? 'center' : undefined}
                  >
                    <Hidden smDown>{serviceQuestion}</Hidden>

                    <Grid item style={{ marginTop: matchesSM ? 50 : '5em' }}>
                      <Select
                        labelId='platforms'
                        id='platforms'
                        disabled={service === 'Website'}
                        multiple
                        displayEmpty
                        style={{ width: matchesSM ? 250 : '12em' }}
                        renderValue={
                          platforms.length > 0 ? undefined : () => 'Platforms'
                        }
                        value={platforms}
                        onChange={(e) => setPlatforms(e.target.value)}
                      >
                        {platformOption.map((option) => (
                          <MenuItem key={option} value={option}>
                            {' '}
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid
                  item
                  container
                  direction='column'
                  sm
                  style={{ marginTop: 16 }}
                  alignItems='center'
                >
                  <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                    <KeyboardDatePicker
                      format='MM/dd/yyy'
                      style={{ width: matchesSM ? 250 : undefined }}
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </Grid>
                  <Hidden smDown>{complexityQuestion}</Hidden>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction='column'
                  alignItems={matchesSM ? 'center' : undefined}
                  sm
                >
                  <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                    <TextField
                      style={{ width: matchesSM ? 250 : undefined }}
                      label='total'
                      id='total'
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Hidden smDown>{userQuestions}</Hidden>

                  <Grid item style={{ marginTop: matchesSM ? 50 : '5em' }}>
                    <Select
                      labelId='Features'
                      id='Features'
                      MenuProps={{ style: { zIndex: 1302 } }}
                      style={{ width: matchesSM ? 250 : '12em' }}
                      multiple
                      displayEmpty
                      renderValue={
                        features.length > 0 ? undefined : () => 'Features'
                      }
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                    >
                      {(service === 'Website'
                        ? websiteOption
                        : featuresOption
                      ).map((feature) => (
                        <MenuItem key={feature} value={feature}>
                          {' '}
                          {feature}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify='center' style={{ marginTop: '3em' }}>
              <Grid item>
                <Button
                  color='primary'
                  style={{ fontWeight: 300 }}
                  onClick={() => setDialogOpen(false)}
                >
                  Cancle
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  className={classes.button}
                  onClick={addProject}
                  disabled={
                    service === 'Website'
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length == 0 ||
                        service.length === 0
                  }
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
