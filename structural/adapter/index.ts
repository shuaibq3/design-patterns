/**
 * Adapter Pattern
 * Converts the interface of a class into another interface clients expect.
 */

// Existing incompatible interface
export interface OldMediaPlayer {
  playAudio(): void;
  playVideo(): void;
}

// New interface that clients expect
export interface NewMediaPlayer {
  play(fileType: string, fileName: string): void;
}

// Legacy implementation
export class LegacyMediaPlayer implements OldMediaPlayer {
  playAudio(): void {
    console.log('Playing audio with legacy player');
  }

  playVideo(): void {
    console.log('Playing video with legacy player');
  }
}

// Adapter
export class MediaPlayerAdapter implements NewMediaPlayer {
  private legacyPlayer: OldMediaPlayer;

  constructor(legacyPlayer: OldMediaPlayer) {
    this.legacyPlayer = legacyPlayer;
  }

  play(fileType: string, fileName: string): void {
    console.log(`Playing ${fileName}`);

    if (fileType === 'audio') {
      this.legacyPlayer.playAudio();
    } else if (fileType === 'video') {
      this.legacyPlayer.playVideo();
    } else {
      console.log('Unsupported file type');
    }
  }
}

// Modern client
class ModernMediaClient {
  private player: NewMediaPlayer;

  constructor(player: NewMediaPlayer) {
    this.player = player;
  }

  playMedia(fileType: string, fileName: string): void {
    this.player.play(fileType, fileName);
  }
}

// Usage
const legacyPlayer = new LegacyMediaPlayer();
const adapter = new MediaPlayerAdapter(legacyPlayer);
const client = new ModernMediaClient(adapter);

client.playMedia('audio', 'song.mp3');
client.playMedia('video', 'movie.mp4');
