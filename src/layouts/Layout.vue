<!--Static layout component-->
<template>
  <div class="layout">

    <!--Navbar-->

    <nav class="navbar">
      <div class="navbar-wrapper">
        <router-link to="/red" class= "btn red-btn">Экран №1</router-link>
        <router-link to="/yellow" class= "btn yellow-btn">Экран №2</router-link>
        <router-link to="/green" class= "btn green-btn">Экран №3</router-link>
      </div>
    </nav>

    <!--Main content-->

    <main class="main-content">
      <router-view />
    </main>


    <!--Footer-->

    <footer>
      <p>Все права защищены © 2020-2021 YS Portfolio</p>
    </footer>
  </div>
</template>
