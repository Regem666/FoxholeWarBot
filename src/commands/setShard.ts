import { Message, MessageEmbed } from 'discord.js';
import serverConfig from '../mongodb/serverConfig';

module.exports = {
  name: 'setShard',
  description: 'Sets Server shard to get data from.',
  async execute(msg: Message, args: string[]) {
    if (args[0]) {
      serverConfig.findOne(
        { guildID: msg.guildId },
        async (err: any, data: any) => {
          if (data) {
            if (args[0] == 'shard1') {
              data.shard = 'https://war-service-live.foxholeservices.com';
              data.shardName = 'Shard_1';
              data.save().catch((err: any) => console.log(err));
              await msg.react('👍').catch((err) => {
                console.log(err);
                console.log('No permission to react! Notifying!');
                msg.reply(
                  'Please add the permission to react! Shard Changed! 👍'
                );
              });
            } else if (args[0] == 'shard2') {
              data.shard = 'https://war-service-live-2.foxholeservices.com';
              data.shardName = 'Shard_2';
              data.save().catch((err: any) => console.log(err));
              await msg.react('👍').catch((err) => {
                console.log(err);
                console.log('No permission to react! Notifying!');
                msg.reply(
                  'Please add the permission to react! Shard Changed! 👍'
                );
              });
            }
          } else if (!data) {
            if (args[0] == 'shard1') {
              const newServerConfig = new serverConfig({
                guildID: msg.guildId,
                shard: 'https://war-service-live.foxholeservices.com',
                shardName: 'Shard_1',
              });

              await newServerConfig
                .save()
                .catch((err: any) => console.log(err));

              await msg.react('👍').catch((err) => {
                console.log(err);
                console.log('No permission to react! Notifying!');
                msg.reply(
                  'Please add the permission to react! Shard Changed! 👍'
                );
              });
            } else if (args[0] == 'shard2') {
              const newServerConfig = new serverConfig({
                guildID: msg.guildId,
                shard: 'https://war-service-live-2.foxholeservices.com',
                shardName: 'Shard_2',
              });

              await newServerConfig
                .save()
                .catch((err: any) => console.log(err));

              await msg.react('👍').catch((err) => {
                console.log(err);
                console.log('No permission to react! Notifying!');
                msg.reply(
                  'Please add the permission to react! Shard Changed! 👍'
                );
              });
            } else {
              msg.reply({ content: 'Not a valid option!' });
            }
          }
        }
      );
    } else {
      msg.reply({ content: 'Please specify shard! { shard1 | shard2 }' });
    }
  },
};
