Perspecteev Customer Favorites — Setup & Installation Guide

tech stack and architecture:
	a. frontend: react, vite
	b. backend: nodejs, express
	c. database and ORM: sqlite, drizzle orm

prerequisites:
	a. nodejs => v18.x or 20.x recommended
	b. ngrok => for exposing your local port to shopify securely
	c. a shopify partner account with a development store created

step 1: clone the project and install dependencies
	a. git clone //
	b. cd herperspecteev/backend
	c. npm install
	d. cd ../frontend
	e. npm install

step 2: confirgure environment variables (get these details at step 5: h)
	a. SHOPIFY_API_KEY=your_app_client_id_from_partner_dashboard
	b. SHOPIFY_API_SECRET=your_app_client_secret_from_partner_dashboard
	c. HOST=https://your-temporary-subdomain.ngrok-free.dev
	d. PORT=8081

step 3: run the database migrations
	a. npx drizzle-kit push

step 4: run your backend and frontend, then use ngrok
	a. cd frontend
	b. npm run build
	c. cd ../backend
	d. npm run dev
	e. open another terminal and type "ngrok http 8081"
	r. get the provided URL

step 5: configure URLS in the shopify partner dashboard
	a. log into your shopify partner dashboard <https://dev.shopify.com/dashboard>
	b. navigate to Apps > click "Create app" on the top left of your screen
	c. choose the right side out of the two choices "Start from Dev Dashboard" and enter your App name > click Create
	d. under App URL, paste your ngrok URL:
		i. example => https://your-temporary-subdomain.ngrok-free.dev
	d. under "Redirect URLs, paste this:
		i. https://your-temporary-subdomain.ngrok-free.dev/auth/callback
	e. click "Release"
	f. you will see a new popup modal that lets you name the version as well as its description, you may skip that and proceed by clicking "Release"
	g. in the same page, look at the left side of the screen and locate "Settings", click on it
	h. under "Credentials", copy the Client ID as well as the Secret key
	i. go back to the homepage by clicking the logo "dev dashboard"
	j. under Apps module, locate the app that you have just created, you will see details like "0 installs - <version-name>", click on it
	k. on the top right section of the screen you will see "Installs" card. Click on "Install app" button
	l. you will be redirected to a new tab, to which you will choose which store to install your app in, before clicking a store, make sure that your localhost is running:
		i. you already run "npm run build" for the frontend
		ii. your backend is running via "npm run dev"
		iii. and you already have your ngrok running via "ngrok http 8081"
		iv. if you have made some changes in your .env file, re run your backend.
	m. once everything is set, click on your store.

step 6: copy the liquid files into your theme editor (part 1)
	a. go to root folder of the project > theme > product-item.html
	b. copy the entire block of code and paste it into your main-product.liquid, locate where you want it pasted (could be after the "Add to Cart" button)
	c. you can locate your theme code editor by going to your shopify admin website <https://admin.shopify.com/store>, under Sales Channels > Online Store
	d. beside the "Edit theme" button, there is a three, horizontal dots, click on it and choose "Edit code"
	e. edit the URLs

step 7: copy the liquid files into your theme editor (part 2)
	a. go to root folder of the project > theme > collection.html
	b. go to your theme editor (not the code editor) by going to Sales Channels > Online Store > Edit theme
	c. in the product page, add your custom liquid section
	d. paste your copied block of code from your collection.html
	e. edit the URLs
	