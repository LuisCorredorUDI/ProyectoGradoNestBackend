import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import * as firebase from 'firebase-admin';
import { sendNotificationDTO } from './dto/send-notification.dto';

@Injectable()
export class NotificationService {

  //unico dispositivo
  async sendPush(notification: sendNotificationDTO) {
    try {
      await firebase
        .messaging()
        .sendEachForMulticast({
          data: {
            title: notification.title,
            body: notification.body,
          },
          tokens: notification.deviceId,
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

}
