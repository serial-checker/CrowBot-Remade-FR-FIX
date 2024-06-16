const Discord = require('discord.js')
const db = require('quick.db')
const {
    MessageActionRow,
    MessageButton,
    MessageMenuOption,
    MessageMenu
} = require('discord-buttons');

module.exports = {
    name: 'voice',
    aliases: ['vc', 'stats', 'stat'],

    run: async (client, message, args, prefix, color) => {
        let perm = ""
        message.member.roles.cache.forEach(role => {
            if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
            if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
            if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
                const guild = client.guilds.cache.get(args[0]) || message.guild

        if (args[0] === "all") {

            var streamingCount = 0;
            var mutedCount = 0;
            var mutedMic = 0;
            var cameraCount = 0;
            var connectedCount = 0;

            const channels = message.guild.channels.cache.filter(c => c.type === 'voice');
            channels.forEach(c => {
                connectedCount += c.members.size;
                c.members.forEach(m => {
                    if (m.voice.streaming) streamingCount++;
                    if (m.voice.selfDeaf || m.voice.serverDeaf) mutedCount++;
                    if (m.voice.selfMute || m.voice.serverMute) mutedMic++;
                    if (m.voice.selfVideo) cameraCount++;
                })
            })
            const voiceConnectedEmbed = new Discord.MessageEmbed()
                //.setTitle(`<a:100animosite_fleur:1251662459958460509> ${message.guild.name} __Statistiques !__`)
                .setAuthor(`${message.guild.name} Statistiques !`, 'https://www.image-heberg.fr/files/17184964951637652956.gif')
                //.setURL('https://discord.gg/2BvuJ9mnFd')
                .setThumbnail(guild.iconURL({dynamic: true}))
                .setDescription(`
${message.guild.memberCount > 1 ? '*Membres:*' : '*Membre:*'} **${message.guild.memberCount}**
${message.guild.members.cache.filter(m => m.user.presence.status !== 'offline').size > 1 ? '*En Lignes:*' : '*En Ligne:*'} **${message.guild.members.cache.filter(m => m.user.presence.status !== 'offline').size}**
${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? '*En Vocals:*' : '*En Vocal:*'} **${message.guild.members.cache.filter(m => m.voice.channel).size}**
${message.guild.premiumSubscriptionCount > 1 ? '*Boost:*' : '*Boosts:*'} **${message.guild.premiumSubscriptionCount}**
`)
                .setColor(color)
                .setTimestamp()
                //.setFooter(`${message.guild.name} #Statistiques`)

                if (guild.icon) voiceConnectedEmbed.setThumbnail(guild.iconURL({
                    dynamic: true
                }))

            return message.channel.send(voiceConnectedEmbed)
        } else if (!args[1]) {
            let embed = new Discord.MessageEmbed()
                .setTimestamp()
				//.setTitle(`<a:100animosite_fleur:1251662459958460509> ${message.guild.name} __Statistiques Vocal !__`)
                .setAuthor(`${message.guild.name} Statistiques Vocal !`, 'https://www.image-heberg.fr/files/17184964951637652956.gif')
				//.setURL('https://discord.gg/2BvuJ9mnFd')
				.setThumbnail(guild.iconURL({dynamic: true}))
                .setDescription(`**${message.guild.members.cache.filter(m => m.voice.channel).size}** ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? '*Personnes actuellement en* **Vocals**' : '*Personnes actuellement en* **Vocal**'}`)
                .setColor(color)
                //.setFooter(`${message.guild.name} #Statistiques`)

            message.channel.send(embed)

        } else if (!args[0] || args[0] === "info") {
            if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
                if (args[1] === "all") {

                    var streamingCount = 0;
                    var mutedCount = 0;
                    var mutedMic = 0;
                    var cameraCount = 0;
                    var connectedCount = 0;

                    const channels = message.guild.channels.cache.filter(c => c.type === 'voice');
                    channels.forEach(c => {
                        connectedCount += c.members.size;
                        c.members.forEach(m => {
                            if (m.voice.streaming) streamingCount++;
                            if (m.voice.selfDeaf || m.voice.serverDeaf) mutedCount++;
                            if (m.voice.selfMute || m.voice.serverMute) mutedMic++;
                            if (m.voice.selfVideo) cameraCount++;
                        })
                    })
                    const voiceConnectedEmbed = new Discord.MessageEmbed()
                        //.setTitle(`<a:100animosite_fleur:1251662459958460509> ${message.guild.name} __Statistiques Activité Vocal !__`)
                        .setAuthor(`${message.guild.name} _Statistiques Activité Vocal !`, 'https://www.image-heberg.fr/files/17184964951637652956.gif')
                        //.setURL('https://discord.gg/2BvuJ9mnFd')
                        .setThumbnail(guild.iconURL({dynamic: true}))
                        .setDescription(` 
**${message.guild.members.cache.filter(m => m.voice.channel).size}** ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? '*Personnes actuellement en* **Vocal**' : '*Personnes actuellement en* **Vocal**'}
**${mutedMic}** ${mutedMic > 1 ? '*Personnes*' : '*Personne*'} *Sont mute* **Micro**
**${mutedCount}** ${mutedCount > 1 ? '*Personnes*' : '*Personne*'} *Sont mute* **Casque**
**${streamingCount}** ${streamingCount > 1 ? '*Personnes*' : '*Personne*'} *Sont en* **Stream**
**${cameraCount}** ${cameraCount > 1 ? '*Personnes*' : '*Personne*'} *Sont en* **Caméra**
`)
                        .setColor(color)
                        .setTimestamp()
                        //.setFooter(`${message.guild.name} #Statistiques`)

                    return message.channel.send(voiceConnectedEmbed)
                } else if (!args[1]) {
                    let embed = new Discord.MessageEmbed()
                        .setTimestamp()
                        //.setTitle(`<a:100animosite_fleur:1251662459958460509> ${message.guild.name} __Statistiques Vocal !__`)
                        .setAuthor(`${message.guild.name} Statistiques Vocal !`, 'https://www.image-heberg.fr/files/17184964951637652956.gif')
                        //.setURL('https://discord.gg/2BvuJ9mnFd')
			            .setThumbnail(guild.iconURL({dynamic: true}))
                        .setDescription(`**${message.guild.members.cache.filter(m => m.voice.channel).size}** ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? '*Actuellement en* **Vocals**' : '*Actuellement en* **Vocal**'}`)
                        .setColor(color)
                        //.setFooter(`${message.guild.name} #Statistiques`)

                    message.channel.send(embed)
                }
            }
        }
    }
}
    }
