import { Controller, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('win/:userId')
  async winGame(@Param('userId') userId: string) {
    const newScore = await this.gameService.addWinPoints(Number(userId));
    return { message: 'Очки начислены!', newScore };
  }
}
