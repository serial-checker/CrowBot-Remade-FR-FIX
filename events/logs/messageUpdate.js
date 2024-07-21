const axios = require('axios');
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")

module.exports = async (client, oldMessage, newMessage, message) => {

	let guild = oldMessage.guild
	const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)
	let wass = db.get(`msglog_${oldMessage.guild.id}`);
	const logschannel = oldMessage.guild.channels.cache.get(wass)
    
	if (logschannel) logschannel.send(new Discord.MessageEmbed()
		.setColor(color)
        .setAuthor(`${oldMessage.author.username}`, oldMessage.author.displayAvatarURL({dynamic : true }))
		.setDescription(`**Message édité dans** <#${oldMessage.channel.id}> par ${oldMessage.author}`)
		.addField(`Avant`, `${oldMessage.content}`)
		.addField(`Après`, `${newMessage.content}`)
		//.setFooter(`${client.config.name}`)
		.setTimestamp())
}
