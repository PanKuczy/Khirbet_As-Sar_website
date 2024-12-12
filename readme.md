# Khirbet As-Sar Excavations Project Website

## Description
Khirbet As-Sara Excavations Project website created for the Faculty of Archaeology of Warsaw University.

## **Important**
Before deploying the page on a hosting server remove from the head of each html the following code:

```html
<script> 
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const baseTag = document.createElement("base");
baseTag.href = isLocal ? "/" : "/Khirbet_As-Sar_website/";
document.head.appendChild(baseTag);
</script>
```

## Features
- Responsive design

## Technologies
- HTML, CSS, JavaScript, Bootstrap
- Flexsearch npm for search module
- PhotoSwipe npm for images display handling

## Other information
- There are minor SCSS customizations of bootstrap, mostly color related
- There's no cookie consent module because there's no tracking of any information
- There's no SEO-optimization

## Contact
- Author: Przemysław Kuczyński
- https://github.com/PanKuczy/
- Email: paleblue.visual@gmail.com