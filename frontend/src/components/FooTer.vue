<template>
  <div>
    <footer>
      <div class="social">
        <p>
          Created With <i class="bi bi-peace-fill"></i> By
          <a href="https://www.instagram.com/mickoandrnn/">Micko Andrian.</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
footer {
  position: fixed;
  text-align: center;
}

footer .social {
  padding: 21rem 0;
}
footer .social p {
  color: #fff;
  margin: -5rem 0 0 50rem;
  font-weight: 500;
}
footer .social a {
  color: #fff;
}

/* Responsive */
@media (max-width: 768px) {
  footer .social p {
    margin: -5rem 0 0 21rem;
  }
}

/* Mobile Phone */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  footer .social p {
    margin: -5rem 0 0 15rem;
  }
}
</style>
