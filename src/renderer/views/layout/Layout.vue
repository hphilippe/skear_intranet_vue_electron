<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">

		<div id="loader" style="display:none;">
			<div class="cssload-wrap">
				<div class="cssload-cssload-spinner"></div>
				<div class="cssload-title">Chargement ...</div>
			</div>
		</div>

		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.app-wrapper.hideSidebar .sidebar-container {
  width: 39px;
  overflow: inherit;
}
.app-wrapper.hideSidebar .main-container {
  margin-left: 39px;
}
.app-wrapper .sidebar-container {
  transition: width 0.28s ease-out;
  width: 200px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow-y: auto;
}
.app-wrapper .sidebar-container::-webkit-scrollbar {
  display: none;
}
.app-wrapper .main-container {
  min-height: 100%;
  transition: margin-left 0.28s ease-out;
  margin-left: 200px;
}

</style>
