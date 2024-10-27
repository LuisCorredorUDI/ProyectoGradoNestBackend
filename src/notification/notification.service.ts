import { Injectable } from '@nestjs/common';
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
          tokens: notification.deviceId,
          data: {
            title: notification.title,
            body: notification.body,
          },
          notification: {
            title: notification.title,
            body: notification.body,
          },
        })
        .catch((error: any) => {
          console.error('Error enviando la notificación:', error);
        });
    } catch (error) {
      console.log('Error en sendPush:', error);
      return error;
    }
  }
  

}
