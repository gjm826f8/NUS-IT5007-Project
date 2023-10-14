# IT5007 - Team 20

## 1. Project Init
This project was created and tuned in a local environment. When itegrating with back-end side, we will move the whole front-end project to run in the docker.
1. `npm install`
2. `npm start`

## 2. Pages and Functions
### 2.1 Landing Page

### 2.2 xxxxx (map view)

### 2.3 Log In Page
Form validation is deployed. After log in, the programm will redirect you to the homepage, with the original `Log In` button been replaced by a `User Email` button (for example: `user@example.com`). This is also the entrance of 2.4 and 2.5 for tenant, or 2.6 and 2.7 for agents. 
#### 2.3.1 Log In Flow (for both Tenant and Agent)
1. Click `Log In` button, navigate to `/login` page.
2. Click the red text to switch from tenant login and agent login. (by default, tenant log in)
3. Enter the registered email, and click `Continue` button.
4. Enter the password, and click `Log In` button. If password correct, redirect to landing page. If wrong, browser will throw an alert.

#### 2.3.2 Sign Up Flow (only for Tenant)
P.S.: As Real estate agents in Singapore are required to hold a series of licenses, which dictates that there are certain tedious steps required for the vetting of agent qualifications. Therefore, an agent cannot register directly as a user of the website. If they want to register, they need to contact the staff.
1. Click `Log In` button, navigate to `/login` page.
2. Click the red text to switch from tenant login and agent login. Tenants can only register themselves under tanant log in mode.
3. Enter the new email account, and click `Continue` button.
4. After setting the password and confirming the password, click `Register and Log In` button. Then will redirect to the landing page.

#### 2.3.3 Log Out Flow
Under log in status, user can click the `User Email` button on the right-top side of the website, and click `Log Out` option to log out from the system.

### 2.4 Favorites (Tenant)

Log the properties that user clicked `Like` button. The entrance only shows after log in.

- House listing mode: The properties are shown with detailed pictures and information.
- Comparison mode: The properties are shown in a tabular way, only important information relevant to decision-making is listed above.
  
Toggle between two modes with one toggle switch shows on the right-top corner.

### 2.5 History (Tenant)
Log the properties that user viewed. The entrance only shows after log in. The properties are shown with detailed pictures and information.

### 2.6 View All Posts (Agent)
Log the properties that the current agent posted before. The entrance only shows after log in. The properties are shown with detailed pictures and information.

### 2.7 Post New (Agent)
A form that allows agent to list a new property. Form validation is deployed. 
