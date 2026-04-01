/**
 * Bridge Pattern
 * Decouples an abstraction from its implementation so the two can vary independently.
 *
 * Example: Remote Control with Devices
 * The bridge separates the abstraction (RemoteControl) from implementations (Devices),
 * allowing them to vary independently. Different remotes can control different devices.
 */

// Implementation abstraction - different device types
export interface Device {
  powerOn(): void;
  powerOff(): void;
  setChannel(channel: number): void;
  getChannel(): number;
  setVolume(volume: number): void;
  getVolume(): number;
}

// Concrete device implementations
export class Television implements Device {
  private channel = 1;
  private volume = 50;
  private power = false;

  powerOn(): void {
    this.power = true;
    console.log('TV is powered on');
  }

  powerOff(): void {
    this.power = false;
    console.log('TV is powered off');
  }

  setChannel(channel: number): void {
    if (this.power) {
      this.channel = channel;
      console.log(`TV channel set to ${channel}`);
    }
  }

  getChannel(): number {
    return this.channel;
  }

  setVolume(volume: number): void {
    if (this.power) {
      this.volume = Math.max(0, Math.min(100, volume));
      console.log(`TV volume set to ${this.volume}`);
    }
  }

  getVolume(): number {
    return this.volume;
  }
}

export class Radio implements Device {
  private channel = 101.5;
  private volume = 30;
  private power = false;

  powerOn(): void {
    this.power = true;
    console.log('Radio is powered on');
  }

  powerOff(): void {
    this.power = false;
    console.log('Radio is powered off');
  }

  setChannel(channel: number): void {
    if (this.power) {
      this.channel = 88 + (channel % 33) + Math.random() * 0.1;
      console.log(`Radio tuned to ${this.channel.toFixed(1)} FM`);
    }
  }

  getChannel(): number {
    return this.channel;
  }

  setVolume(volume: number): void {
    if (this.power) {
      this.volume = Math.max(0, Math.min(100, volume));
      console.log(`Radio volume set to ${this.volume}`);
    }
  }

  getVolume(): number {
    return this.volume;
  }
}

// Abstraction - Remote control (bridges to devices)
export abstract class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  abstract volumeUp(): void;
  abstract volumeDown(): void;
  abstract channelUp(): void;
  abstract channelDown(): void;
}

// Concrete remote controls
export class BasicRemote extends RemoteControl {
  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 5);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 5);
  }

  channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 1);
  }

  channelDown(): void {
    this.device.setChannel(this.device.getChannel() - 1);
  }
}

export class AdvancedRemote extends RemoteControl {
  power(): void {
    if (this.device.getVolume() > 0) {
      this.device.powerOff();
    } else {
      this.device.powerOn();
    }
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 2);
  }

  channelDown(): void {
    this.device.setChannel(this.device.getChannel() - 2);
  }
}

// Usage
console.log('--- Remote Control with Devices Example ---\n');

const tv = new Television();
const basicRemote = new BasicRemote(tv);

tv.powerOn();
basicRemote.channelUp();
basicRemote.volumeUp();
basicRemote.volumeUp();

console.log('');

const radio = new Radio();
const advancedRemote = new AdvancedRemote(radio);

radio.powerOn();
advancedRemote.channelUp();
advancedRemote.volumeUp();
advancedRemote.volumeUp();
