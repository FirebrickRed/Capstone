import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { NavController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";

export class User {
  username: string;
  password: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public user: User = new User();

  get errorMsg(): string {
    let result = "";
    switch (this.authService.errorMsg) {
      case "auth/invalid-email":
        result = "Not a valid email. Please try again using '@' and '.'";
        break;
      case "auth/user-not-found":
        result = "Email not found. Please double check the email you entered.";
        break;
      case "auth/wrong-password":
        result =
          "Incorrect password. Please double check that you spelled your password correctly.";
        break;
      default:
        result = "";
        break;
    }
    return result;
  }

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  login(username, password) {
    this.authService.login(username, password);
    console.log("login");
    console.log(this.errorMsg);
  }

  signUp() {
    console.log("Click!!");
    this.navCtrl.navigateRoot("signup");
  }
}
