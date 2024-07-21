const axios = require('axios');
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")

module.exports = async (client, member, channel, message) => {
    
	const color = db.get(`color_${member.guild.id}`) === null ? client.config.color : db.get(`color_${member.guild.id}`)
	let wass = db.get(`logvc_${member.guild.id}`);
	const logschannel = member.guild.channels.cache.get(wass)
    
	if (logschannel) logschannel.send(new Discord.MessageEmbed()
		.setColor(color)
        .setAuthor(`${member.user.username}`, member.user.displayAvatarURL({dynamic : true }))
		.setDescription(`${member} quitte **le salon** <#${channel.id}>`)
		//.setFooter(`${client.config.name}`)
		.setTimestamp()
	)
}
