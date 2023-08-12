const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "rolememberinfo",
  aliases: ["rmi", "rmemberinfo", "rolemember"],
  category: "utility",
  description: "Shows List Of Members Having A Role",
  usage: "m/rolememberinfo <role mention/role id>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (args.includes("@everyone")) return;

    if (args.includes("@here")) return;

    if (!args[0]) return message.channel.send("**Please Enter A Role!**");

    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role) return message.channel.send("**Please Enter A Valid Role!**");

    let membersWithRole = message.guild.members.cache
      .filter((member) => {
        return member.roles.cache.find((r) => r.name === role.name);
      })
      .map((member) => {
        return member.user.username;
      });
    if (membersWithRole > 2048)
      return message.channel.send("**List Is Too Long!**");

    let roleEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setTitle(`Users With The ${role.name} Role!`)
      .setDescription(`>>> ${membersWithRole.join("\n\n")}`);
    message.channel.send(roleEmbed);
  },
};
