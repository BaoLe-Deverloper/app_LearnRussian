export const userAuth = {
    isAuthenticated: false,
    claim : "",
    authenticate(claim) {
      this.isAuthenticated = true
      this.claim = claim
    },
    signOut() {
      this.isAuthenticated = false
      this.claim=""
    }
  }