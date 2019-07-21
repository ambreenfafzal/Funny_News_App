# Funny_News_App

**Requirement:** 
Create a web app that lets users view and leave comments on the latest news. 

**User Story:** 
As a user with access to the Funny_News_App website, I should be able to view the lastest news from a the New Yorker site. I should be able to leave comment for each news article and view existing comment entered by other users. 

*****

**Libraries**
* express
* mongoose
* cheerio
* axios

****

**Framework**
* Bootstrap

****
**IDE**
* Visual Studio

****

**Deployment**
* Heroku

****
# Demo

****
1. The Homepage displays the news scraped from The New Yorker using cheerio and axios packages.
![Homepage](https://user-images.githubusercontent.com/47581926/61596165-a2380c80-abc5-11e9-81ad-0e2186e5722e.JPG)

2. Click on the Article title
3. **Notes** section is displayed. 

![note](https://user-images.githubusercontent.com/47581926/61596166-a2380c80-abc5-11e9-810d-6216e55d18f3.JPG)


4. Type name in the first field
5. Type comment in the free-text field
6. Click on **Save Note**
![Comment](https://user-images.githubusercontent.com/47581926/61596164-a2380c80-abc5-11e9-98ce-cca34b2819c4.JPG)


Comment is saved in the db and is associated to the selected article. 
![savedcomment](https://user-images.githubusercontent.com/47581926/61596367-1a073680-abc8-11e9-90cb-debdb20ade5b.JPG)

