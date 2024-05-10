const {
	MessageEmbed
} = require('discord.js')
const db = require('quick.db')
const superagent = require('superagent')

module.exports = {
	name: 'porngif',
	aliases: ['pgif','nsfw','porn'],
	run: async (client, message, args, prefix, color) => {

		let perm = ""
		message.member.roles.cache.forEach(role => {
			if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
			if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
			if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
		})
		if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true) {

			if (message.channel.nsfw) {
				if (!args[0]) {

					const embed = new MessageEmbed()

					superagent.get('https://nekobot.xyz/api/image')
						.query({
							type: 'pgif'
						})
						.end((err, response) => {
							embed.setImage(response.body.message)
							embed.setTitle("Catégorie De L'image Envoyé : PornGif 🔞")
							embed.setFooter(`${client.config.name}`)
							embed.setColor(color);

							message.channel.send({
								embed: embed
							});

						});
				}
			}
		}
	}
}
