import { Component, OnInit } from "@angular/core";
import { ItemService } from "../services/item.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

declare var createjs: any;

@Component({
  selector: "app-character-page",
  templateUrl: "./character-page.page.html",
  styleUrls: ["./character-page.page.scss"]
})
export class CharacterPagePage implements OnInit {
  public currChar;
  public xpPercent;
  public stage: any;
  public charInventory;
  public wearing;
  public closet;
  public isShowingCloset = false;

  public friendCode: any;
  public friends: any;
  public pendingFriends = [];
  public trueFriends = [];
  public needsFriends = [];
  public friendStages = [];
  // public flossimage = new Image();
  // public newStage: any;

  constructor(
    public iService: ItemService,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public uService: UserService
  ) {}

  ngOnInit() {
    this.uService
      .read_friends(this.afAuth.auth.currentUser.uid)
      .subscribe(data => {
        this.friends = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            status: e.payload.doc.data()["status"],
            Name: e.payload.doc.data()["Name"]
          };
        });
        console.log("friends: ");
        console.log(this.friends);
        this.pendingFriends = [];
        this.needsFriends = [];
        this.trueFriends = [];
        for (let i = 0; i < this.friends.length; i++) {
          if (this.friends[i].status == "Pending") {
            this.pendingFriends.push(this.friends[i]);
          } else if (this.friends[i].status == "NeedsResponse") {
            this.needsFriends.push(this.friends[i]);
          } else if (this.friends[i].status == "Accepted") {
            this.iService.read_Character(this.friends[i].id).subscribe(data => {
              let temp = data.map(e => {
                return {
                  id: e.payload.doc.id,
                  isEdit: false,
                  Name: e.payload.doc.data()["Name"],
                  Gold: e.payload.doc.data()["Gold"],
                  XP: e.payload.doc.data()["XP"],
                  Level: e.payload.doc.data()["Level"]
                };
              });
              console.log("temp");
              console.log(temp[0]);
              //console.log(temp[0].id);
              temp[0]["clothes"] = [];
              this.iService
                .read_CharacterInventory(this.friends[i].id, temp[0].id)
                .subscribe(data => {
                  let clothes = data.map(e => {
                    return {
                      id: e.payload.doc.id,
                      isEdit: false,
                      Name: e.payload.doc.data()["CanvasName"],
                      isWearing: e.payload.doc.data()["isWearing"],
                      X: e.payload.doc.data()["X"],
                      Y: e.payload.doc.data()["Y"],
                      Z: e.payload.doc.data()["Z"]
                    };
                  });
                  //console.log('clotes');
                  //console.log(clothes);
                  for (let i = 0; i < clothes.length; i++) {
                    if (clothes[i].isWearing) {
                      temp[0]["clothes"].push(clothes[i]);
                    }
                  }
                });
              //console.log('does work')
              //console.log(temp[0]);
              this.trueFriends.push(temp[0]);
              console.log(this.trueFriends);
              //document.getElementById(temp[0].Name).style.color = 'black';
            });
          }
        }
      });
    this.iService
      .read_Character(this.afAuth.auth.currentUser.uid)
      .subscribe(data => {
        this.currChar = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()["Name"],
            Gold: e.payload.doc.data()["Gold"],
            XP: e.payload.doc.data()["XP"],
            Level: e.payload.doc.data()["Level"]
          };
        });
        this.currChar = this.currChar[0];
        this.xpPercent = this.currChar.XP / (this.currChar.Level * 20);
        this.iService
          .read_CharacterInventory(
            this.afAuth.auth.currentUser.uid,
            this.currChar.id
          )
          .subscribe(data => {
            this.charInventory = data.map(e => {
              return {
                id: e.payload.doc.id,
                isEdit: false,
                Name: e.payload.doc.data()["Name"],
                Cost: e.payload.doc.data()["Cost"],
                CanvasName: e.payload.doc.data()["CanvasName"],
                isWearing: e.payload.doc.data()["isWearing"],
                X: e.payload.doc.data()["X"],
                Y: e.payload.doc.data()["Y"],
                Z: e.payload.doc.data()["Z"]
              };
            });
            //console.log(this.charInventory);
            this.stage = new createjs.Stage("avatarCanvas");
            this.stage.removeAllChildren();
            var bitmap = new createjs.Bitmap("assets/Ghostie.png");
            this.stage.addChildAt(bitmap, 0);
            //this.update(3);
            this.update(2);
            this.update(1);
            createjs.Ticker.addEventListener("tick", this.stage);
          });
        //console.log(this.xpPercent);
      });
    this.stage = new createjs.Stage("avatarCanvas");
  }

  // loadImage() {
  //   console.log("in Load");
  //   var preload = new createjs.LoadQueue();
  //   preload.addEventListener("fileload", this.handleFileComplete);
  //   preload.loadFile("assets/Ghostie.png");
  // }

  // handleFileComplete() {
  //   console.log("handle file complete");
  // }

  // friendStuff() {
  //   this.showingFriends = !this.showingFriends;
  //   if (this.showingFriends) {
  //     document.getElementById("friends").style.display = "block";
  //   }
  //   console.log("friendStuff");
  //   console.log(this.trueFriends);
  //   for (let i = 0; i < this.trueFriends.length; i++) {
  //     this.friendStages.push(new createjs.Stage(this.trueFriends[i].Name));
  //   }
  //   console.log("stages");
  //   console.log(this.friendStages);
  //   for (let i = 0; i < this.trueFriends.length; i++) {
  //     console.log(this.trueFriends);
  //     console.log(document.getElementById(this.trueFriends[i].Name));
  //     //let newstage = new createjs.Stage(this.trueFriends[i].Name);
  //     //let img = new createjs.SpriteSheet('assets/Ghostie.png');
  //     //this.friendStages[i].addChild(img);
  //     // var preload = new createjs.LoadQueue();
  //     // preload.addEventListener('fileload', event => {
  //     //   console.log('preloading')
  //     //   document.body.appendChild(event.result);
  //     //   //let img = new createjs.Bitmap(event.result);
  //     //   //console.log(img);
  //     //   //this.friendStages[i].addChild(img);
  //     //   //this.friendStages[i].update;
  //     // })
  //     // preload.loadFile('assets/Ghostie.png');
  //     var circle = new createjs.Shape();
  //     circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
  //     circle.x = 100;
  //     circle.y = 100;
  //     this.friendStages[i].addChild(circle);
  //     this.friendStages[i].update;
  //     //createjs.Ticker.addEventListener('tick', this.friendStages[i]);
  //   }
  // }

  addFriend() {
    console.log("add friend");
    console.log(this.friendCode)
    //console.log(this.friendCode);
    let friend = [];
    let code = this.friendCode;
    this.iService.read_Character(this.friendCode).subscribe(data => {
      friend = data.map(e => {
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()["Name"]
        };
      });
      console.log("friend");
      let status = {
        status: "Pending",
        Name: friend[0].Name
      }
      console.log(friend);
      console.log(code);
      console.log(this.friendCode)
      this.uService.create_newFriend(
        this.afAuth.auth.currentUser.uid,
        code,
        status
      );
    });
    let status = {
      status: "NeedsResponse",
      Name: this.currChar.Name
    };
    this.uService.create_newFriend(
      this.friendCode,
      this.afAuth.auth.currentUser.uid,
      status
    );
    this.friendCode = "";
  }

  acceptFriend(id) {
    //console.log(this.pendingFriends);
    this.uService.update_friend(this.afAuth.auth.currentUser.uid, id, {
      status: "Accepted"
    });
    this.uService.update_friend(id, this.afAuth.auth.currentUser.uid, {
      status: "Accepted"
    });
  }

  rejectFriend(id) {
    this.uService.delete_friend(this.afAuth.auth.currentUser.uid, id);
    this.uService.delete_friend(id, this.afAuth.auth.currentUser.uid);
  }

  update(num) {
    this.wearing = [];
    this.closet = [];

    //console.log("update");
    //console.log(this.charInventory);

    if (this.charInventory != undefined) {
      this.charInventory.forEach(item => {
        //console.log(item);
        //console.log(num + " " + item.Z);
        if (item.isWearing && item.Z == num) {
          //console.log("in if");
          //console.log(this.stage);
          //console.log(item);
          let bit = new createjs.Bitmap(`assets/${item.CanvasName}.png`);
          bit.x = item.X;
          bit.y = item.Y;
          this.stage.addChild(bit);
          this.wearing.push(item);
        } else {
          this.closet.push(item);
        }
        this.stage.update();
      });
    }
  }

  copy() {
    // console.log(`id: ${id}`);
    // console.log('copy')
    // id.select();
    // document.execCommand('copy')
    // var copytext = document.getElementById('textToCopy');
    // copytext.select()
    console.log("copy");
    var textArea = document.createElement("textarea");
    textArea.value = this.afAuth.auth.currentUser.uid;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  equip(event) {
    let record = {};
    record["Name"] = event.Name;
    record["CanvasName"] = event.CName;
    record["Cost"] = event.Cost;
    record["isWearing"] = event.isWearing;
    record["X"] = event.X;
    record["Y"] = event.Y;
    record["Z"] = event.Z;
    this.iService
      .create_NewCharacterItemWId(
        record,
        this.afAuth.auth.currentUser.uid,
        this.currChar.id,
        event.id
      )
      .catch(err => {
        console.log(err);
      });
    //console.log(this.charInventory);
    this.stage.removeAllChildren();
    var bitmap = new createjs.Bitmap("assets/Ghostie.png");
    this.stage.addChildAt(bitmap, 0);
    //this.update(3);
    this.update(2);
    this.update(1);
  }
}
