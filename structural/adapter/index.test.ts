/**
 * Tests for Adapter Pattern
 */

import {
  NewMediaPlayer,
  LegacyMediaPlayer,
  MediaPlayerAdapter
} from './index';

describe('Adapter Pattern', () => {
  test('adapter should adapt legacy interface to new interface', () => {
    const legacyPlayer = new LegacyMediaPlayer();
    const adapter = new MediaPlayerAdapter(legacyPlayer);

    expect(typeof adapter.play).toBe('function');
  });

  test('adapter should call playAudio for audio fileType', () => {
    const legacyPlayer = new LegacyMediaPlayer();
    const spy = jest.spyOn(legacyPlayer, 'playAudio');
    const adapter = new MediaPlayerAdapter(legacyPlayer);

    adapter.play('audio', 'song.mp3');

    expect(spy).toHaveBeenCalled();
  });

  test('adapter should call playVideo for video fileType', () => {
    const legacyPlayer = new LegacyMediaPlayer();
    const spy = jest.spyOn(legacyPlayer, 'playVideo');
    const adapter = new MediaPlayerAdapter(legacyPlayer);

    adapter.play('video', 'movie.mp4');

    expect(spy).toHaveBeenCalled();
  });

  test('adapter should work with new interface expectations', () => {
    const legacyPlayer = new LegacyMediaPlayer();
    const adapter = new MediaPlayerAdapter(legacyPlayer);

    const newInterfaceExpectation: NewMediaPlayer = adapter;

    expect(newInterfaceExpectation).toBeDefined();
    expect(typeof newInterfaceExpectation.play).toBe('function');
  });

  test('adapter should delegate to legacy player', () => {
    const legacyPlayer = new LegacyMediaPlayer();
    const audioSpy = jest.spyOn(legacyPlayer, 'playAudio');
    const videoSpy = jest.spyOn(legacyPlayer, 'playVideo');

    const adapter = new MediaPlayerAdapter(legacyPlayer);

    adapter.play('audio', 'audio.mp3');
    adapter.play('video', 'video.mp4');

    expect(audioSpy).toHaveBeenCalledTimes(1);
    expect(videoSpy).toHaveBeenCalledTimes(1);
  });
});
