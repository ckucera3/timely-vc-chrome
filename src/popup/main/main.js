import Options from '../options/options'
import Groups from '../groups/groups'
import MainDOM from './main.dom'
import * as User from '../../model/User'
import * as Comment from '../../model/Comment'
import * as Group from '../../model/Group'

function initApp() {

  let DOM = new MainDOM()

  /**
   * closeLoginPrompt and loginPrompt are passed to User.js,
   *   and are called when the login/logout status of the 
   *   user changes.
   */
  User.initializeFirebase(closeLoginPrompt, loginPrompt)

  DOM.submitBtn.addEventListener('click', submit)
    DOM.optionsBtn.addEventListener('click', openOptions)
    DOM.groupsBtn.addEventListener('click', openGroups)
  DOM.logout.addEventListener('click', logout)
  DOM.inputField.addEventListener('keydown', inputKeydown)


  function submit() {
    Comment.postComment(DOM.inputField.value)
    DOM.clearInputField()
  }

  function openGroups() {
        Groups()
    }

  function openOptions() {
    Options()
  }

  function logout() {
    User.logout()
  }

  function inputKeydown(e) {
    if (e.keyCode === 13) {
      DOM.submitBtn.click()
    }
    DOM.updateCharLabel()
  }

  function loginPrompt() {
    if (!User.isUserLoggedIn()) {
      let el = document.createElement('div')
      el.innerHTML = DOM.getLoginOverlay();
      document.body.appendChild(el)
      setTimeout(() => document.getElementsByClassName('login-overlay')[0].classList.remove('loading'), 200)
      document.getElementById('welcome-login-btn').addEventListener('click', () => User.login())
    }
  }

  function closeLoginPrompt() {
    let overlay = document.getElementsByClassName('login-overlay')[0];
    if (!overlay) { return console.log('prompt not open') }
    overlay.classList.add('loading')
    setTimeout(() => overlay.parentElement.remove(), 500)
  }

  /**
 * This function should be extracted out to wherever
 *  the group functionality is made. ../groupview/groupview.js ?
 */
  function createGroup() {
    Group.createGroup({ name: DOM.inputField.value })
    DOM.clearInputField()
  }
}

window.onload = function () {
  initApp()
}