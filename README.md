# The News App

### Requirements

    - Article search and filtering: Users should be able to search for articles by keyword and filter the results by date, category, and source.

    - Personalized news feed: Users should be able to customize their news feed by selecting their preferred sources, categories, and authors.

    - Mobile-responsive design: The website should be optimized for viewing on mobile devices.

## Founding while building the application

- NewsApi and newsApi.org both are redirecting to same domain also providing great documentation
- Open news don't have proper documentation
- BCC news don't provide proper documentation instead we can have this from News api using param as source
- NewsCred now rebranded itsself to `https://www.optimizely.com/newscred/` and don't provide news api
- NewYorkTimes, NewsApi and The Guardian are only providing documentation for api and working.
- In all API documentation i didn't Found for filter based on author so won't able to add this feature

## limitations

- For news api we have to have paid subscription for run api on deployed version it will work fine in local

## Featured

- Here we are giving default filter for min one source and search keywords so user don't land on empty ui for better UX
- Search can be changed based on search keywords and filters being apply
- By Click on setting icons user can change preferences any time if user applies preferences then change in filter it will get data based on filter
- If any API fails due to rate limit since its free api then user needs to change filter for source

## Scope of improvement

- Code splitting
- Paginating feature and virtualization
- api caching for performance based on search keywords and certain filters and time limit
- Mobile responsive features such as swipe
- could have moved keys to environment variables to keep them more secure

## How to run Application

- clone the repository `git clone https://github.com/shivamupadhyay008/news-app.git`
- `cd news-app`
- if you want to run without docker
- `npm i` and `npm run dev`

### with docker

- open docker desktop
- `docker built -t news-app .`
- docker images for checking the docker
- `docker run -d -p 80:80 --name news-app-container news-app`
- `docker ps` to check if container is running
- now you can run see on running port 80
- `docker rm -f news-app-container`
