
fullscan();

async function fullscan() {
    
  await postExecutionPublishReport('Completed');
  await scan();
 // await postExecutionPublishReport('Completed');

  }

async function scan() {
  const sonarqubeScanner = require('sonarqube-scanner');
  let server = process.env.backendIP || 'localhost';
  sonarqubeScanner(
    {
      serverUrl : 'http://'+server+':9000',
      options: {
        'sonar.projectName': 'awswrkshp-aut-frontend',
        'sonar.projectDescription': 'Mythical Mysfits'
      }
    },
    () => process.exit()
  )
  }
  
async function postExecutionPublishReport(status) {
  let reportServer = process.env.backendIP || 'localhost';
  const request = require('superagent');
  let strPayLoad ={"moduleName":"codecoverage_static_ui","status":status};
  try{
    const response = await request
    .post(`http://${reportServer}:3337/api/v1/aws_dashboard_report/moudule/update`)
    .send(strPayLoad)
    .set('content-type', 'application/json')
    .set('accept', 'application/json')
    .set('X-Requested-With', 'XMLHttpRequest');
  } catch(err){
    console.log('WARN: Report Server is not up')
  }
}
