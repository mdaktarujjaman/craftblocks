/**
 * WordPress dependencies.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { members } = attributes;

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div className="craftblocks-team-grid">
				{ members.map( ( member, index ) => (
					<div key={ index } className="craftblocks-team-card">
						{ member.imageUrl && (
							<div
								className="craftblocks-team-image"
								style={ { backgroundImage: 'url(' + member.imageUrl + ')' } }
							/>
						) }

						<RichText.Content
							tagName="h4"
							className="craftblocks-team-name"
							value={ member.name }
						/>

						<RichText.Content
							tagName="p"
							className="craftblocks-team-position"
							value={ member.position }
						/>

						<RichText.Content
							tagName="p"
							className="craftblocks-team-bio"
							value={ member.bio }
						/>

						{ member.socialLinks && member.socialLinks.length > 0 && (
							<div className="craftblocks-team-social-links">
								{ member.socialLinks.map( ( link, linkIndex ) => (
									<a
										key={ linkIndex }
										href={ link.url }
										className={ 'craftblocks-social-icon craftblocks-social-' + link.platform }
									>
										{ link.platform }
									</a>
								) ) }
							</div>
						) }
					</div>
				) ) }
			</div>
		</div>
	);
}