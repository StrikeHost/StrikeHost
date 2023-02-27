import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { ImageService } from 'src/admin/image/image.service';
import {
  ClientMessageType,
  ServerMessageType,
} from 'src/enums/WebsocketMessageType';

@WebSocketGateway()
export class ImageGateway {
  constructor(private imageService: ImageService) {}

  @SubscribeMessage(ClientMessageType.REQUEST_IMAGE_LISTINGS)
  async RequestImageListings(): Promise<WsResponse> {
    const images = await this.imageService.getImageListings();
    return {
      event: ServerMessageType.IMAGE_LISTINGS_RESPONSE,
      data: { images },
    };
  }
}
