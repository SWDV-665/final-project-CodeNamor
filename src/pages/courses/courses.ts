import { LoadingController, NavController, NavParams } from '@ionic/angular';

import { TeesPage } from '../tees/tees';
import { Component } from '@angular/core';
import {CoursesApiService} from "../../services/courses-api.service";
import { async } from 'q';

@Component({
  selector: 'page-all-courses',
  templateUrl: 'all-courses.html',
})
export class CoursesPage {

  selectedItem: any;
  private courseOptions: Array<{ name: string, id: number, image: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public API: CoursesApiService,public loadingCtrl: LoadingController) {
    this.selectedItem = navParams.get('item');
    }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad CoursesPage');

     const loader = this.loadingCtrl.create({
      message: "Loading Local Courses.."
    });
     await loader.present().then(() => {
      this.API.findCourses().subscribe(data => {
        this.courseOptions = data.courses;
        await loader.dismiss();
        console.log(this.courseOptions);
      });
    });
  }

  courseChosen(event, courseId) {
    this.navCtrl.pop(AllTeesPage, {
      courseId: courseId
    });
  }
}